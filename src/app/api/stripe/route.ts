import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import admin from "firebase-admin";

import { stripe } from "@/lib/stripe";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    // =====================================================
    // READ RAW STRIPE BODY
    // =====================================================

    const body = await req.text();

    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      console.error("Stripe signature missing");

      return new NextResponse("Missing Stripe signature", {
        status: 400,
      });
    }

    // =====================================================
    // VERIFY STRIPE WEBHOOK
    // =====================================================

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error) {
      console.error(
        "Stripe webhook signature verification failed:",
        error
      );

      return new NextResponse("Invalid signature", {
        status: 400,
      });
    }

    // =====================================================
    // WEBHOOK RECEIVED
    // =====================================================

    console.log("========================================");
    console.log("STRIPE WEBHOOK RECEIVED");
    console.log("Event ID:", event.id);
    console.log("Event Type:", event.type);
    console.log("========================================");

    // =====================================================
    // ONLY TEST CHECKOUT SESSION COMPLETED
    // =====================================================

    if (event.type === "checkout.session.completed") {
      const session =
        event.data.object as Stripe.Checkout.Session;

      console.log("Checkout Session ID:", session.id);
      console.log("Payment Status:", session.payment_status);
      console.log("Amount Total:", session.amount_total);
      console.log("Currency:", session.currency);
      console.log("Metadata:", session.metadata);

      // ===================================================
      // CREATE DUMMY FIRESTORE DOCUMENT
      // ===================================================

      const testRef = await adminDb
        .collection("stripeWebhookTest")
        .add({
          webhookReceived: true,

          eventId: event.id,

          eventType: event.type,

          sessionId: session.id,

          paymentStatus: session.payment_status ?? null,

          amountTotal: session.amount_total ?? null,

          currency: session.currency ?? null,

          customerEmail: session.customer_details?.email ?? null,

          customerName: session.customer_details?.name ?? null,

          orderMasterId:
            session.metadata?.orderMasterId ?? null,

          metadata: session.metadata ?? {},

          createdAt:
            admin.firestore.FieldValue.serverTimestamp(),
        });

      console.log(
        "Stripe test document created:",
        testRef.id
      );
    }

    // =====================================================
    // ALWAYS RETURN SUCCESS
    // =====================================================

    return NextResponse.json({
      received: true,
      eventId: event.id,
      eventType: event.type,
    });
  } catch (error) {
    console.error(
      "Stripe webhook error:",
      error
    );

    return NextResponse.json(
      {
        received: false,
        error: "Webhook processing failed",
      },
      {
        status: 500,
      }
    );
  }
}