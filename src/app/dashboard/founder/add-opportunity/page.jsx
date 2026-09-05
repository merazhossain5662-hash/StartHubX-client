import AddOpportunityComponent from "@/components/AddOpportunityComponent";
import React from "react";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AddOpportunityPage = async () => {
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
  console.log(session?.user?.plan); // Log the user's plan to the console
  const startupData = await res.json();
  const startupId = startupData[0]?._id;
  const opportunityRes = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/opportunities/${startupId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const { totalCount } = await opportunityRes.json();
  return (
    <div>
      <AddOpportunityComponent
        startupData={startupData[0] || null}
        totalCount={totalCount}
        userPlan={session?.user?.plan || "free"}
      />
    </div>
  );
};

export default AddOpportunityPage;
