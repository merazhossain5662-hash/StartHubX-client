import AddOpportunityComponent from "@/components/AddOpportunityComponent";
import React from "react";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AddOpportunityPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/startup/${session?.user?.email}`,
  );
  const startupData = await res.json();
  return (
    <div>
      <AddOpportunityComponent startupData={startupData[0] || null} />
    </div>
  );
};

export default AddOpportunityPage;
