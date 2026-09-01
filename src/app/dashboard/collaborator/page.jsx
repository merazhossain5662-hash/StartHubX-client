import React from "react";
import Link from "next/link";
import { Briefcase, ChartLineArrowUp, PersonPencil } from "@gravity-ui/icons";
const collaboratorPage = () => {
  const cards = [
    {
      id: "browse",
      title: "Browse Opportunities",
      description: "Find your perfect startup role",
      icon: Briefcase,
      iconColor: "text-indigo-400",
      href: "/opportunities",
    },
    {
      id: "applications",
      title: "My Applications",
      description: "Track your application status",
      icon: ChartLineArrowUp,
      iconColor: "text-emerald-400",
      href: "/dashboard/collaborator/my-applications",
    },
    {
      id: "profile",
      title: "Update Profile",
      description: "Showcase your skills and bio",
      icon: PersonPencil,
      iconColor: "text-purple-400",
      href: "/profile",
    },
  ];
  return (
    <div className="min-h-screen bg-[#090a16] text-slate-100 p-8 sm:p-12 font-sans">
      {/* Header Section */}
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          Welcome, Boboiboy{" "}
          <span className="animate-bounce inline-block">👋</span>
        </h1>
        <p className="text-slate-400 text-base">
          Discover opportunities and track your applications.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Link
              key={card.id}
              href={card.href}
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl text-center
                         bg-white/[0.03] backdrop-blur-md border border-white/[0.08]
                         hover:bg-white/[0.07] hover:border-white/[0.18] hover:shadow-2xl hover:shadow-indigo-500/10
                         transition-all duration-300 ease-out outline-none"
            >
              {/* Icon */}
              <div className="absolute top-6 left-6">
                <IconComponent
                  className={`w-6 h-6 ${card.iconColor} transition-transform group-hover:scale-110`}
                />
              </div>

              {/* Text Content */}
              <div className="mt-8 space-y-1">
                <h3 className="text-lg font-semibold text-white tracking-wide">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 font-normal">
                  {card.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default collaboratorPage;
