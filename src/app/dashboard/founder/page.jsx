import OverviewDiv from "@/components/OverviewDiv";
import { Spinner } from "@heroui/react";
import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const founderPage = async () => {
  const { user, isPending } = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/startups?email=${user?.email}`,
  );
  const startupData = await res.json();
  const startupId = startupData[0]?._id;
  const opportunityRes = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/opportunity?startupId=${startupId}`,
  );
  const opportunityData = await opportunityRes.json();
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
        Wellcome, <span className="font-bold ml-1">{user.name}</span>
      </h1>
      <p className="text-xs md:text-sm text-gray-500">
        Here's an overview of your startup activity.
      </p>
      <OverviewDiv opportunityData={opportunityData || []} />
    </div>
  );
};

export default founderPage;
