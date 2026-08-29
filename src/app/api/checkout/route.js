import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // 1. Read the JSON body ONCE
    const body = await req.json();
    console.log("Received body:", body);

    const { userEmail, userId } = body;

    // 2. Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "payment",
      customer_email: userEmail,
      metadata: {
        userId: userId || "",
        userEmail: userEmail || "",
        plan: "premium",
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "StartHub X Premium (Lifetime)",
              description:
                "Post unlimited opportunities and build your dream team.",
            },
            unit_amount: 29.99,
          },
          quantity: 1,
        },
      ],
      return_url: `${req.headers.get("origin")}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id parameter" },
        { status: 400 },
      );
    }

    // Retrieve full session object from Stripe using the session_id
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      status: session.status,
      paymentStatus: session.payment_status,
      customerEmail:
        session.customer_details?.email || session.metadata?.userEmail,
      metadata: session.metadata,
      amountTotal: session.amount_total,
    });
  } catch (err) {
    console.error("Stripe Session Retrieval Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
