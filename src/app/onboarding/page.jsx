"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "@heroui/react";
import { Rocket, Persons, Check } from "@gravity-ui/icons";

export default function OnboardingPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("founder");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const userRole = session?.user?.role?.toLowerCase();
    if (userRole === "founder" || userRole === "collaborator") {
      router.push(`/dashboard/${userRole}`);
    }
  }, [session, router]);

  const handleSelectRole = async () => {
    if (!session?.user?.email) return;

    setUpdating(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/user/roler/${session?.user?.email}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: selectedRole }),
        },
      );

      if (res.ok) {
        router.push(`/dashboard/${selectedRole.toLowerCase()}`);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to update role.");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <Spinner size="lg" color="info" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-transparent relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[#204561]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#8dd0f2]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <div className="relative w-full max-w-xl rounded-3xl border border-[#224764]/60 shadow-2xl shadow-[#022b3f]/70 bg-gray-900/40 p-8 sm:p-10 backdrop-blur-xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Choose Your Journey
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xs mx-auto">
            Select how you want to participate in the platform to get started.
          </p>
        </div>

        {/* Interactive Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Founder Card */}
          <div
            onClick={() => setSelectedRole("founder")}
            className={`relative cursor-pointer rounded-2xl p-5 border backdrop-blur-md transition-all duration-300 flex flex-col justify-between space-y-4 ${
              selectedRole === "founder"
                ? "bg-[#012639]/70 border-[#8dd0f2]/80 shadow-lg shadow-[#8dd0f2]/10 text-white"
                : "bg-white/5 border-white/10 hover:border-[#224764] text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-[#204561]/50 border border-[#8dd0f2]/30 text-[#8dd0f2]">
                <Rocket className="size-6" />
              </div>
              {selectedRole === "founder" && (
                <div className="size-6 rounded-full bg-[#8dd0f2] flex items-center justify-center text-gray-950">
                  <Check className="size-4 stroke-[3]" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-base text-white">Founder</h3>
              <p className="text-xs text-gray-400 mt-1">
                Post startups, find talent, and build your dream team.
              </p>
            </div>
          </div>

          {/* Collaborator Card */}
          <div
            onClick={() => setSelectedRole("collaborator")}
            className={`relative cursor-pointer rounded-2xl p-5 border backdrop-blur-md transition-all duration-300 flex flex-col justify-between space-y-4 ${
              selectedRole === "collaborator"
                ? "bg-[#012639]/70 border-[#8dd0f2]/80 shadow-lg shadow-[#8dd0f2]/10 text-white"
                : "bg-white/5 border-white/10 hover:border-[#224764] text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-[#204561]/50 border border-[#8dd0f2]/30 text-[#8dd0f2]">
                <Persons className="size-6" />
              </div>
              {selectedRole === "collaborator" && (
                <div className="size-6 rounded-full bg-[#8dd0f2] flex items-center justify-center text-gray-950">
                  <Check className="size-4 stroke-[3]" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-base text-white">
                Collaborator
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Join exciting projects, contribute skills, and grow.
              </p>
            </div>
          </div>
        </div>

        {/* Confirm Action Button */}
        <Button
          onClick={handleSelectRole}
          isPending={updating}
          disabled={updating}
          className="w-full rounded-xl py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#2a587b] via-[#437fac] to-[#6bc8f6] hover:opacity-95 shadow-lg shadow-[#022b3f]/60 transition"
        >
          {updating ? "Setting up..." : "Continue to Dashboard"}
        </Button>
      </div>
    </div>
  );
}
