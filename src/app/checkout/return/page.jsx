"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ReturnContent() {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const isSubscribedRef = useRef(false);

  useEffect(() => {
    if (sessionId) {
      // Calls the GET route we exported above
      fetch(`/api/checkout?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSessionData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch session:", err);
          setLoading(false);
        });
      async function handlePaymentVerification() {
        try {
          const isPaid =
            sessionData?.status === "complete" ||
            sessionData?.paymentStatus === "paid";

          if (isPaid && !isSubscribedRef.current) {
            isSubscribedRef.current = true; // Guard against duplicate calls

            const userEmail =
              sessionData?.customerEmail || sessionData?.metadata?.userEmail;
            const userId = sessionData?.metadata?.userId;
            const plan = sessionData?.metadata?.plan || "premium";

            // 3. POST to your Express backend route (/api/subscribetion)
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/subscribetion`,
              {
                // Update URL/port to match your Express server URL
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId,
                  userEmail,
                  plan,
                  sessionId,
                  paymentStatus: sessionData?.paymentStatus,
                }),
              },
            );
          }
        } catch (err) {
          console.error("Error during return process:", err);
        } finally {
          setLoading(false);
        }
      }
      handlePaymentVerification();
    } else {
      setLoading(false);
    }
  }, [sessionId, isSubscribedRef, sessionData]);

  if (loading) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-[#224764]/40 bg-gray-900/50 backdrop-blur-xl p-10 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-sky-400/20 border-t-sky-400 rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-400 animate-pulse">
          Verifying payment details...
        </p>
      </div>
    );
  }

  if (
    sessionData?.status === "complete" ||
    sessionData?.paymentStatus === "paid"
  ) {
    const userEmail =
      sessionData?.customerEmail ||
      sessionData?.metadata?.userEmail ||
      "your account";

    return (
      <div className="w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-gray-900/80 to-[#0b1726]/90 backdrop-blur-2xl p-8 text-center space-y-6 shadow-2xl shadow-emerald-950/40 relative overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Animated Celebration Icon */}
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-emerald-500/20">
            <svg
              className="w-10 h-10 text-emerald-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Content Header */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 inline-block">
            Payment Confirmed
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome to Premium! 🎉
          </h1>
          <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed pt-1">
            Receipt sent to{" "}
            <span className="text-sky-300 font-medium underline underline-offset-4 decoration-sky-400/40">
              {userEmail}
            </span>
            . Your account has been upgraded with lifetime access.
          </p>
        </div>

        {/* Feature Highlights Card */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span className="text-emerald-400">✓</span> Post unlimited startup
            opportunities
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span className="text-emerald-400">✓</span> Access premium
            team-building features
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/dashboard/founder/manage-opportunities"
          className="inline-flex w-full justify-center items-center rounded-xl py-3.5 text-xs font-semibold text-white bg-gradient-to-r from-sky-600 via-sky-500 to-emerald-500 hover:opacity-95 transition-all duration-300 shadow-lg shadow-sky-950/50 hover:shadow-sky-500/20 active:scale-[0.98]"
        >
          Go to Dashboard →
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-rose-500/30 bg-gray-900/40 backdrop-blur-xl p-8 text-center space-y-4">
      <div className="text-3xl">⚠️</div>
      <h2 className="text-lg font-bold text-white">Payment Unverified</h2>
      <p className="text-xs text-gray-400">
        We couldn't verify your checkout session. Please check your dashboard or
        contact support.
      </p>
      <Link
        href="/checkout"
        className="inline-block text-xs text-sky-400 underline hover:text-sky-300"
      >
        Return to Checkout
      </Link>
    </div>
  );
}

export default function ReturnPage() {
  return (
    <div className="min-h-screen bg-[#070d14] flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-white text-xs">Loading...</div>}>
        <ReturnContent />
      </Suspense>
    </div>
  );
}
