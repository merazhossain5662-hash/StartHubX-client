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

  const fetchClientSecret = useCallback(async () => {
    // Session is guaranteed to be loaded here
    const userEmail = session?.user?.email;
    const userId = session?.user?.id || session?.user?._id;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: userEmail || "",
        userId: userId || "",
      }),
    });
    const data = await res.json();
    return data.clientSecret;
  }, [session]);

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

        <div className="w-full rounded-3xl border border-[#224764]/60 bg-gray-900/40 backdrop-blur-xl p-6 shadow-2xl shadow-[#022b3f]/40 hover:border-[#8dd0f2]/40 transition-all duration-300 min-h-[500px] flex items-center justify-center">
          {/* Prevent checkout from mounting while session is loading */}
          {isPending ? (
            <div className="text-center space-y-3">
              <div className="w-8 h-8 border-4 border-sky-400/20 border-t-sky-400 rounded-full animate-spin mx-auto" />
              <p className="text-xs text-gray-400 animate-pulse">
                Preparing secure checkout...
              </p>
            </div>
          ) : (
            <EmbeddedCheckoutProvider
              key={session?.user?.email} // Key forces re-initialization with correct user
              stripe={stripePromise}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout className="w-full min-h-[500px]" />
            </EmbeddedCheckoutProvider>
          )}
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
