import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import admin from "firebase-admin";

import { stripe } from "@/lib/stripe";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  // =====================================================
  // READ RAW BODY
  // =====================================================

  const body = await req.text();

  const signature =
    req.headers.get("stripe-signature");

  if (!signature) {
    console.error(
      "Stripe webhook signature is missing."
    );

    return new NextResponse(
      "Missing Stripe signature",
      {
        status: 400,
      }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error(
      "STRIPE_WEBHOOK_SECRET is missing."
    );

    return new NextResponse(
      "Stripe webhook secret is missing",
      {
        status: 500,
      }
    );
  }

  // =====================================================
  // VERIFY STRIPE WEBHOOK
  // =====================================================

  let event: Stripe.Event;

  try {
    event =
      stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
  } catch (error) {
    console.error(
      "Stripe webhook signature verification failed:",
      error
    );

    return new NextResponse(
      "Invalid signature",
      {
        status: 400,
      }
    );
  }

  console.log(
    "Stripe webhook received:",
    event.type,
    event.id
  );

  // =====================================================
  // HANDLE CHECKOUT COMPLETED
  // =====================================================

  switch (event.type) {
    case "checkout.session.completed": {
      const session =
        event.data.object as Stripe.Checkout.Session;

      console.log(
        "Checkout completed:",
        session.id
      );

      // =================================================
      // VERIFY PAYMENT STATUS
      // =================================================

      if (session.payment_status !== "paid") {
        console.log(
          "Checkout completed but payment is not paid:",
          session.payment_status
        );

        break;
      }

      // =================================================
      // GET ORDER ID FROM STRIPE METADATA
      // =================================================

      const orderMasterId =
        session.metadata?.orderMasterId;

      console.log(
        "Order ID:",
        orderMasterId
      );

      if (!orderMasterId) {
        console.error(
          "Stripe Checkout Session is missing orderMasterId metadata.",
          {
            sessionId: session.id,
            eventId: event.id,
          }
        );

        // Event was received successfully.
        // Do not make Stripe retry forever because
        // application metadata is missing.
        return NextResponse.json({
          received: true,
          processed: false,
          reason:
            "Missing orderMasterId metadata",
        });
      }

      // =================================================
      // GET FIRESTORE ORDER
      // =================================================

      const orderRef =
        adminDb
          .collection("orderMaster")
          .doc(orderMasterId);

      const orderSnap =
        await orderRef.get();

      if (!orderSnap.exists) {
        console.error(
          `Order not found: ${orderMasterId}`,
          {
            sessionId: session.id,
            eventId: event.id,
          }
        );

        return NextResponse.json({
          received: true,
          processed: false,
          reason: "Order not found",
          orderMasterId,
        });
      }

      const order =
        orderSnap.data();

      // =================================================
      // IDEMPOTENCY CHECK
      // =================================================

      if (
        order?.paymentStatus === "PAID"
      ) {
        console.log(
          `Order ${orderMasterId} is already marked as PAID.`
        );

        break;
      }

      // =================================================
      // AMOUNT
      // =================================================

      const grandTotal =
        Number(
          order?.grandTotal ?? 0
        );

      const paidAmount =
        Number(
          session.amount_total ?? 0
        ) / 100;

      const dueAmount =
        Math.max(
          grandTotal - paidAmount,
          0
        );

      console.log(
        "Order amount:",
        {
          grandTotal,
          paidAmount,
          dueAmount,
          currency: session.currency,
        }
      );

      // =================================================
      // UPDATE ORDER
      // =================================================

      await orderRef.update({
        paymentMode: "ONLINE",

        paymentProvider: "STRIPE",

        paymentMethod: "CARD",

        paymentStatus: "PAID",

        paidAmount,

        dueAmount,

        stripeSessionId:
          session.id,

        stripePaymentIntentId:
          typeof session.payment_intent ===
          "string"
            ? session.payment_intent
            : null,

        stripeEventId:
          event.id,

        updatedAt:
          admin.firestore.FieldValue
            .serverTimestamp(),
      });

      console.log(
        `Order ${orderMasterId} marked as PAID successfully.`
      );

      break;
    }

    default: {
      console.log(
        `Unhandled Stripe event: ${event.type}`
      );

      break;
    }
  }

  // =====================================================
  // STRIPE SUCCESS RESPONSE
  // =====================================================

  return NextResponse.json({
    received: true,
  });
}