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
    `${process.env.NEXT_PUBLIC_URI}/api/opportunitise/${startupId}`,
  );
  const opportunityData = await opportunityRes.json();
  return (
    <div>
      <ManageOpportunityComponent
        opportunityData={opportunityData || []}
        startupData={startupData[0] || null}
      />
    </div>
  );
};

export default manageOpportunities;
