"use client";

import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { authClient } from "@/lib/auth-client";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function CheckoutPage() {
  const { data: session, isPending } = authClient.useSession();
  console.log(session);
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: session?.user?.email || "user@example.com", // Replace with actual user email
        userId: session?.user?.id || session?.user?._id || "user123", // Replace with actual user ID
      }),
    });
    const data = await res.json();
    return data.clientSecret;
  }, []);

  return (
    <div className="min-h-screen bg-[#070d14] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-3xl z-10 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-semibold px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 backdrop-blur-md inline-block">
            ⚡ Secure Payment
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Complete Your Upgrade
          </h1>
          <p className="text-xs text-gray-400">
            Unlock lifetime access to post unlimited startup opportunities.
          </p>
        </div>

        <div className="w-full rounded-3xl border border-[#224764]/60 bg-gray-900/40 backdrop-blur-xl p-6 shadow-2xl shadow-[#022b3f]/40 hover:border-[#8dd0f2]/40 transition-all duration-300">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout className="w-full min-h-[500px]" />
          </EmbeddedCheckoutProvider>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <svg
            className="w-4 h-4 text-emerald-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>Encrypted 256-bit SSL connection by Stripe</span>
        </div>
      </div>
    </div>
  );
}
