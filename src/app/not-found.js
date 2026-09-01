"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { House, ArrowLeft, Compass } from "@gravity-ui/icons";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-transparent relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#204561]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#8dd0f2]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Glassmorphic Container */}
      <div className="relative w-full max-w-lg rounded-3xl border border-[#224764]/60 shadow-2xl shadow-[#022b3f]/70 bg-gray-900/40 p-8 sm:p-12 backdrop-blur-xl text-center space-y-6 hover:border-[#8dd0f2]/40 transition duration-500">
        {/* Floating Glass Icon Badge */}
        <div className="mx-auto w-20 h-20 rounded-2xl border border-[#8dd0f2]/30 bg-[#012639]/50 flex items-center justify-center shadow-inner backdrop-blur-md">
          <Compass className="size-10 text-[#8dd0f2] animate-spin-slow" />
        </div>

        {/* 404 Header */}
        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#c4e1f0] via-[#8dd0f2] to-[#406882]">
            404
          </h1>
          <h2 className="text-xl font-semibold text-white">Lost in Space?</h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xs mx-auto">
            The page you are looking for doesn’t exist or has been moved to
            another orbit.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link href="/">
            <Button
              variant="secondary"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-[#c4e1f0] border border-[#224764] bg-transparent hover:bg-[#1e4360]/40 hover:border-[#8dd0f2]/50 transition"
            >
              <House className="size-4" />
              Go Home
            </Button>
          </Link>

          <Button
            onClick={() => window.history.back()}
            variant="secondary"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-[#c4e1f0] border border-[#224764] bg-transparent hover:bg-[#1e4360]/40 hover:border-[#8dd0f2]/50 transition"
          >
            <ArrowLeft className="size-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
