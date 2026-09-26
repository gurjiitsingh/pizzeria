import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import admin from "firebase-admin";

import { stripe } from "@/lib/stripe";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  console.log("========================================");
  console.log("STRIPE WEBHOOK POST RECEIVED");
  console.log("========================================");

  const body = await req.text();

  const signature = req.headers.get("stripe-signature");

  console.log("BODY LENGTH:", body.length);
  console.log("SIGNATURE EXISTS:", !!signature);
  console.log(
    "STRIPE_WEBHOOK_SECRET EXISTS:",
    !!process.env.STRIPE_WEBHOOK_SECRET
  );

  // =====================================================
  // 1. SAVE RAW WEBHOOK TEST DOCUMENT
  // =====================================================

  try {
    const testRef = await adminDb
      .collection("stripeWebhookDebug")
      .add({
        receivedAt:
          admin.firestore.FieldValue.serverTimestamp(),

        bodyLength: body.length,

        signatureReceived: !!signature,

        webhookSecretLoaded:
          !!process.env.STRIPE_WEBHOOK_SECRET,

        body: body,

        signature: signature ?? null,

        environment: process.env.NODE_ENV ?? null,

        host:
          req.headers.get("host") ?? null,

        userAgent:
          req.headers.get("user-agent") ?? null,
      });

    console.log(
      "DEBUG FIRESTORE DOCUMENT CREATED:",
      testRef.id
    );
  } catch (error) {
    console.error(
      "DEBUG FIRESTORE WRITE FAILED:",
      error
    );

    return NextResponse.json(
      {
        received: false,
        debugFirestore: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }

  // =====================================================
  // 2. CHECK SIGNATURE
  // =====================================================

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
  // 3. VERIFY STRIPE WEBHOOK
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
    "Stripe webhook signature VERIFIED"
  );

  console.log(
    "Stripe webhook received:",
    event.type
  );

  // =====================================================
  // 4. HANDLE CHECKOUT COMPLETED
  // =====================================================

  switch (event.type) {
    case "checkout.session.completed": {
      const session =
        event.data.object as Stripe.Checkout.Session;

      console.log(
        "Checkout completed:",
        session.id
      );

      // -----------------------------------------------
      // PAYMENT STATUS
      // -----------------------------------------------

      if (session.payment_status !== "paid") {
        console.log(
          "Checkout completed but payment is not paid:",
          session.payment_status
        );

        break;
      }

      // -----------------------------------------------
      // ORDER ID
      // -----------------------------------------------

      const orderMasterId =
        session.metadata?.orderMasterId;

      console.log(
        "Order ID:",
        orderMasterId
      );

      // -----------------------------------------------
      // SAVE STRIPE EVENT DEBUG DATA
      // -----------------------------------------------

      try {
        await adminDb
          .collection("stripeWebhookEvents")
          .add({
            eventId: event.id,

            eventType: event.type,

            sessionId: session.id,

            orderMasterId:
              orderMasterId ?? null,

            paymentStatus:
              session.payment_status,

            amountTotal:
              session.amount_total ?? null,

            currency:
              session.currency ?? null,

            metadata:
              session.metadata ?? {},

            livemode:
              event.livemode,

            stripeCreated:
              event.created,

            receivedAt:
              admin.firestore.FieldValue
                .serverTimestamp(),
          });

        console.log(
          "STRIPE EVENT DEBUG DOCUMENT CREATED"
        );
      } catch (error) {
        console.error(
          "STRIPE EVENT DEBUG WRITE FAILED:",
          error
        );
      }

      // -----------------------------------------------
      // MISSING ORDER ID
      // -----------------------------------------------

      if (!orderMasterId) {
        console.error(
          "Stripe Checkout Session is missing orderMasterId metadata."
        );

        // IMPORTANT:
        // Return 200 so Stripe knows the webhook
        // was received successfully.
        return NextResponse.json({
          received: true,
          processed: false,
          reason:
            "Missing orderMasterId metadata",
        });
      }

      // -----------------------------------------------
      // GET FIRESTORE ORDER
      // -----------------------------------------------

      const orderRef =
        adminDb
          .collection("orderMaster")
          .doc(orderMasterId);

      const orderSnap =
        await orderRef.get();

      if (!orderSnap.exists) {
        console.error(
          `Order not found: ${orderMasterId}`
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

      // -----------------------------------------------
      // IDEMPOTENCY CHECK
      // -----------------------------------------------

      if (
        order?.paymentStatus === "PAID"
      ) {
        console.log(
          `Order ${orderMasterId} is already marked as PAID.`
        );

        break;
      }

      // -----------------------------------------------
      // AMOUNT
      // -----------------------------------------------

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
        "Grand Total:",
        grandTotal
      );

      console.log(
        "Paid Amount:",
        paidAmount
      );

      console.log(
        "Due Amount:",
        dueAmount
      );

      // -----------------------------------------------
      // UPDATE FIRESTORE
      // -----------------------------------------------

      await orderRef.update({
        paymentMode: "ONLINE1",

        paymentProvider: "STRIPE1",

        paymentMethod: "CARD1",

        paymentStatus: "PAID1",

        paidAmount,

        dueAmount,

        updatedAt:
          admin.firestore.FieldValue
            .serverTimestamp(),
      });

      console.log(
        `Order ${orderMasterId} marked as PAID.`
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
  // 5. SUCCESS
  // =====================================================

  return NextResponse.json({
    received: true,
    processed: true,
  });
}