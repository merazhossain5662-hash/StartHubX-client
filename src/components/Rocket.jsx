"use client";

import React from "react";
import { Rocket } from "@gravity-ui/icons";

export default function RocketLoader({ fullScreen = true }) {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 min-h-screen bg-[#001321] text-white flex items-center justify-center p-4 select-none overflow-hidden"
    : "relative flex items-center justify-center p-8 select-none";

  return (
    <div className={containerClasses}>
      <div className="relative flex space-x-3.5 items-center justify-center">
        {/* Red Animated Exhaust Particles Behind Rocket */}
        <div className="absolute -left-5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-ping [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/90 animate-pulse [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        </div>

        {/* Rocket Icon rotated to point horizontally to the right */}
        <div className="relative z-10 transform rotate-45 animate-bounce">
          <Rocket className="w-10 h-10 mx-3 text-white fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
        </div>
      </div>
    </div>
  );
}
