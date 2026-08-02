import React from "react";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ManageOpportunityComponent from "@/components/ManegOpportunityComponet";

const manageOpportunities = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/startup/${session?.user?.email}`,
  );
  const startupData = await res.json();
  const startupId = startupData[0]?._id;
  const opportunityRes = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/opportunities/${startupId}`,
  );
  const { opportunities } = await opportunityRes.json();
  return (
    <div>
      <ManageOpportunityComponent
        opportunityData={opportunities || []}
        startupData={startupData[0] || null}
        userPlan={session?.user?.plan || "free"}
      />
    </div>
  );
};

export default manageOpportunities;
