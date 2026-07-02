"use client";
import OverviewDiv from "@/components/OverviewDiv";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import React from "react";

const founderPage = () => {
  const { data: sessaion, isPending } = useSession();
  if (isPending) {
    return (
      <div className="flex items-center gap-4">
        <Spinner size="lg" className="text-[#8dd0f2]" />
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-lg md:text-2xl ">
        Wellcome, <span className="font-bold ml-1">{sessaion.user.name}</span>
      </h1>
      <p className="text-xs md:text-sm text-gray-500">
        Here's an overview of your startup activity.
      </p>
      <OverviewDiv />
    </div>
  );
};

export default founderPage;
