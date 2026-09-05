import OverviewDiv from "@/components/OverviewDiv";
import { Spinner } from "@heroui/react";
import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const founderPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });
  const { token } = await auth.api.getToken({
    headers: await headers(), // some endpoints might require headers
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/startup/${session?.user?.email}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const startupData = await res.json();
  const startupId = startupData[0]?._id;
  const ApplicationsRes = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/applications/${startupId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const applicationsData = await ApplicationsRes.json();
  const activeApplications =
    applicationsData?.filter((app) => !app?.isOrphan) || [];
  const opportunityRes = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/opportunities/${startupId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const { opportunities } = await opportunityRes.json();

  return (
    <div>
      <h1 className="text-lg md:text-2xl ">
        Wellcome, <span className="font-bold ml-1">{session?.user?.name}</span>
      </h1>
      <p className="text-xs md:text-sm text-gray-500">
        Here's an overview of your startup activity.
      </p>
      <OverviewDiv
        opportunityData={opportunities || []}
        activeApplications={activeApplications}
      />
    </div>
  );
};

export default founderPage;
