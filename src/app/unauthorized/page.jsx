"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRightFromSquare,
  House,
  ShieldExclamation,
  CircleInfoFill,
  Xmark,
} from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
// import { ShieldAlert, Home, LogOut, X, CircleInfoFill } from "lucide-react";

export default function UnauthorizedPage() {
  const { data: session, isPending } = authClient.useSession();
  console.log(session);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogoutAndLogin = async () => {
    setIsLoading(true);
    try {
      if (session?.user) {
        authClient.signOut();
      }

      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001321] text-white flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Premium Background Ambiance Light Spheres */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8dd0f2]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-80 h-80 bg-[#8dd0f2]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#002b4d]/40 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <div className="relative z-10 max-w-lg w-full bg-[#001c30]/40 backdrop-blur-2xl border border-[#8dd0f2]/20 rounded-3xl p-8 sm:p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-[#8dd0f2]/30 transition-all duration-500">
        {/* Decorative Top Accent Glow Bar */}
        <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#8dd0f2] to-transparent shadow-[0_0_12px_#8dd0f2]" />

        {/* Shield Icon Badge */}
        <div className="relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-b from-[#8dd0f2]/20 to-[#8dd0f2]/5 border border-[#8dd0f2]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(141,208,242,0.15)] group">
          <ShieldExclamation className="w-10 h-10 text-[#8dd0f2] drop-shadow-[0_0_8px_rgba(141,208,242,0.6)] group-hover:scale-105 transition-transform duration-300" />
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#8dd0f2] bg-[#8dd0f2]/10 px-3.5 py-1 rounded-full border border-[#8dd0f2]/20 mb-4 shadow-[inset_0_0_10px_rgba(141,208,242,0.1)]">
          <CircleInfoFill className="w-3.5 h-3.5" />
          403 ACCESS RESTRICTED
        </div>

        {/* Title & Description */}
        <h1 className="text-3xl font-extrabold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
          Unauthorized Access
        </h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-sm mx-auto font-normal">
          You don't have the necessary permissions to view this dashboard.
          Switch to an authorized account to continue.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3.5">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium transition-all duration-300 text-slate-200 backdrop-blur-sm hover:border-[#8dd0f2]/20"
          >
            <House className="w-4 h-4 text-slate-400" />
            Back to Home
          </Link>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#8dd0f2] to-[#60b5e3] hover:from-[#a3e0ff] hover:to-[#7ac6f0] text-[#001321] font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(141,208,242,0.3)] hover:shadow-[0_0_30px_rgba(141,208,242,0.5)] transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <ArrowRightFromSquare className="w-4 h-4" />
            Switch Account
          </button>
        </div>
      </div>

      {/* Switch Account Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000810]/70 backdrop-blur-md animate-in fade-in duration-200">
          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-[#001726]/80 backdrop-blur-2xl border border-[#8dd0f2]/30 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Xmark className="w-5 h-5" />
            </button>

            {/* Modal Icon */}
            <div className="w-12 h-12 rounded-xl bg-[#8dd0f2]/10 border border-[#8dd0f2]/20 flex items-center justify-center mb-4">
              <ArrowRightFromSquare className="w-6 h-6 text-[#8dd0f2]" />
            </div>

            {/* Modal Text */}
            <h3 className="text-xl font-bold text-white mb-2">
              Sign out to switch account?
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Logging out will clear your current session so you can log back in
              with a different set of credentials.
            </p>

            {/* Modal Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium text-slate-300 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleLogoutAndLogin}
                disabled={isLoading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8dd0f2] hover:bg-[#a6dcf8] text-[#001321] font-semibold text-sm transition-all shadow-[0_0_15px_rgba(141,208,242,0.3)] disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-block animate-spin border-2 border-[#001321] border-t-transparent rounded-full w-4 h-4" />
                ) : (
                  "Logout & Sign In"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
