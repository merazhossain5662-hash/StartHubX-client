"use client";

import React from "react";
import { Chip } from "@heroui/react";
import { Rocket, Briefcase, Persons, CircleDollar } from "@gravity-ui/icons";

const AdminOverview = ({ data }) => {
  const statItems = [
    {
      title: "Total Revenue",
      value: `$${Number(totalRevenue).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: <CircleDollar className="size-6 text-[#8dd0f2]" />,
      badge: "Gross Earnings",
      badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    },
    {
      title: "Total Startups",
      value: totalStartups,
      icon: <Rocket className="size-6 text-[#8dd0f2]" />,
      badge: "Registered",
      badgeColor: "border-[#8dd0f2]/30 bg-[#8dd0f2]/10 text-[#8dd0f2]",
    },
    {
      title: "Active Roles",
      value: totalOpportunities,
      icon: <Briefcase className="size-6 text-[#8dd0f2]" />,
      badge: "Opportunities",
      badgeColor: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: <Persons className="size-6 text-[#8dd0f2]" />,
      badge: "Platform Users",
      badgeColor: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
    },
  ];
  return (
    <div className="w-full space-y-8 p-6 bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
      {/* Overview Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Admin <span className="text-[#8dd0f2]">Overview</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Real-time metric summary across platform activities
          </p>
        </div>
      </div>

      {/* Grid Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="group relative bg-[#001321]/30 backdrop-blur-md border border-white/10 hover:border-[#8dd0f2]/40 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition duration-300 hover:-translate-y-1 shadow-lg"
          >
            {/* Ambient hover glow spot */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#8dd0f2]/5 blur-2xl rounded-full pointer-events-none group-hover:bg-[#8dd0f2]/15 transition duration-300" />

            <div className="flex items-center justify-between">
              <div className="p-3 bg-[#0f172a]/80 border border-white/10 rounded-xl shadow-inner">
                {item.icon}
              </div>
              <Chip size="sm" className={`text-xs border ${item.badgeColor}`}>
                {item.badge}
              </Chip>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                {item.title}
              </span>
              <h3 className="text-3xl font-bold tracking-tight text-white">
                {item.value}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
