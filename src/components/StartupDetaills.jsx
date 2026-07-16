import React from "react";
import { Chip, Avatar, Button } from "@heroui/react";
import {
  ArrowLeft,
  Globe,
  Clock,
  Factory,
  Envelope,
  Calendar,
  ChartLineArrowUp,
} from "@gravity-ui/icons";
import Link from "next/link";
import AppalyModal from "./AppalyModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const StartupDetaills = async ({ data, opportunityData = [] }) => {
  const sessaion = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });

  // Gracefully handle dynamic fields fallback if your data naming switches around
  const startupName = data?.name || "Startup Name";
  const status = data?.status || "pending";
  const industry = data?.state || "Technology";
  const fundingStage = data?.FundingStage || "Seed";
  const email = data?.FounderEmail || "founder@startup.com";
  const createdAtDate = data?.createdAt
    ? new Date(data.createdAt).toLocaleDateString()
    : "";
  const description = data?.description || "No description provided.";

  return (
    <div className="min-h-screen  text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <Link
          href="/Startups"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Back to Startups
        </Link>

        {/* 🏢 Main Startup Card Container */}
        <div className="bg-[#0f172a]/40 border border-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-start gap-6">
          {/* App Logo Placeholder */}
          <Avatar className="size-16 rounded-2xl">
            <Avatar.Image alt="Extra Large" src={data.profileImage} />
            <Avatar.Fallback className="bg-[#204561] text-lg">
              {startupName?.[0].toUpperCase() || "?"}
            </Avatar.Fallback>
          </Avatar>

          {/* Details Metadata Wrapper */}
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">
                {startupName}
              </h1>
              {status === "approved" ? (
                <Chip
                  size="sm"
                  className="bg-[#0c2a23] text-[#10b981] font-medium border border-[#10b981]/20"
                >
                  approved
                </Chip>
              ) : (
                <Chip
                  size="sm"
                  className="bg-yellow-950/40 text-yellow-500 font-medium border border-yellow-500/20"
                >
                  {status}
                </Chip>
              )}
            </div>

            {/* Icon Badges Context Meta row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <Factory size={14} />
                <span>{industry}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ChartLineArrowUp size={14} />
                <span>{fundingStage}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Envelope size={14} />
                <span className="hover:text-gray-200 transition cursor-pointer">
                  {email}
                </span>
              </div>
              {createdAtDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>{createdAtDate}</span>
                </div>
              )}
            </div>

            <p className="text-gray-300 text-base leading-relaxed max-w-4xl">
              {description}
            </p>
          </div>
        </div>

        {/* 🧑‍💻 Open Roles Section Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Open Roles</h2>
            <div className="bg-purple-950/60 text-purple-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-purple-500/20">
              {opportunityData.length}
            </div>
          </div>

          {/* 📦 Roles Grid Matrix Layout */}
          {opportunityData.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunityData.map(async (role) => {
                console.log(role._id);

                return (
                  <div
                    key={role._id}
                    className="bg-[#0f172a]/40 border border-gray-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-700/80 transition space-y-6"
                  >
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-100">
                        {role.Title}
                      </h3>

                      {/* Skills Mapping Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {role.Skills?.map((skill, idx) => (
                          <Chip
                            key={idx}
                            size="sm"
                            variant="flat"
                            className="bg-[#141233] text-[#7c3aed] border border-[#7c3aed]/20 text-[11px] font-medium"
                          >
                            {skill}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Remote/Commitment meta items */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Globe size={12} className="text-gray-500" />
                          <span>{role.state?.toLowerCase()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-gray-500" />
                          <span>{role.CommitmentLevel?.toLowerCase()}</span>
                        </div>
                      </div>

                      <AppalyModal
                        opportunityData={role}
                        StartupData={data}
                        user={sessaion?.user || null}
                      ></AppalyModal>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border border-dashed border-gray-800 rounded-2xl p-12 text-center">
              <p className="text-gray-500 text-sm">
                No open positions are available right now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartupDetaills;
