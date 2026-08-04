"use client";
import React from "react";
import { Link } from "@heroui/react";

const PremiumPricingCard = () => {
  const features = [
    "Unlimited opportunity postings",
    "Priority listing in search",
    "Premium badge on your startup",
    "Analytics dashboard access",
    "Advanced applicant filtering",
    "Email notifications for applications",
  ];

  return (
    <div className="w-full min-h-screen my-6 max-w-md mx-auto rounded-3xl border border-[#224764] bg-gray-900/80 backdrop-blur-md overflow-hidden shadow-2xl shadow-[#022b3f]/50">
      {/* TOP SECTION */}
      <div className="p-8 bg-gradient-to-b h-full from-[#162e43] to-[#0f1f2e] border-b border-[#224764]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
            ★ Premium Plan
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white mt-3">Unlock Premium</h3>
        <p className="text-xs text-gray-400 mt-1">
          Post unlimited opportunities and build your dream team.
        </p>

        <div className="mt-6 flex items-baseline text-white">
          <span className="text-5xl font-extrabold tracking-tight">$29</span>
          <span className="text-xl font-semibold text-gray-300">.99</span>
          <span className="ml-2 text-xs text-gray-400 font-normal">
            / One-time payment
          </span>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="p-8 space-y-6 bg-gray-950/60">
        <ul className="space-y-3.5 text-xs text-gray-300">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <svg
                className="w-4 h-4 text-emerald-400 shrink-0"
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
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/checkout"
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/20 transition-all duration-200"
        >
          <span>⚡ Upgrade to Premium</span>
        </Link>

        <p className="text-center text-[11px] text-gray-500">
          🔒 Secured by Stripe · Cancel anytime
        </p>
      </div>
    </div>
  );
};

export default PremiumPricingCard;
