"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ReturnContent() {
  const [status, setStatus] = useState(null);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      setStatus("complete");
    }
  }, [sessionId]);

  if (status === "complete") {
    return (
      <div className="w-full max-w-md rounded-3xl border border-emerald-500/30 bg-gray-900/40 backdrop-blur-xl p-8 text-center space-y-5 shadow-2xl shadow-emerald-950/30">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-2xl">
          🎉
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
          <p className="text-xs text-gray-400 mt-2">
            Your account is now upgraded to{" "}
            <span className="text-amber-400 font-medium">Premium</span>. You can
            now post unlimited opportunities.
          </p>
        </div>
        <Link
          href="/dashboard/founder/manage-opportunities"
          className="inline-flex w-full justify-center items-center rounded-xl py-3 text-xs font-semibold text-white bg-gradient-to-r from-[#2a587b] via-[#437fac] to-[#6bc8f6] hover:opacity-90 transition shadow-lg shadow-[#022b3f]/50"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-[#224764] bg-gray-900/40 backdrop-blur-xl p-8 text-center text-gray-400">
      Processing payment validation...
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
