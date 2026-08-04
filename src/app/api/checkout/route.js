import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { user } = await auth.api.getSession({
      headers: await headers(), // some endpoints might require headers
    });
    // 1. Read the JSON body ONCE
    const body = await req.json();
    console.log("Received body:", body);

    const { userId } = body;

    // 2. Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "payment",
      customer_email: user.email,
      metadata: {
        userId: userId || "",
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
            unit_amount: 2999,
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
