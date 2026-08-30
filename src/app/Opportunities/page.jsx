import BrowesOpp from "@/components/BrowesOpp";
import React from "react";

export const dynamic = "force-dynamic";
const OpportunitiesPage = async ({ searchParams }) => {
  const searchQ = await searchParams;
  const urlSearchQ = new URLSearchParams(searchQ);
  const searcString = urlSearchQ.toString();
  if (!urlSearchQ.has("page")) {
    urlSearchQ.set("page", "1");
  }
  console.log(searcString);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/opportunity?${searcString}`,
  );
  const data = await res.json();

  const rawOpportunities = Array.isArray(data)
    ? data
    : data?.positions || data?.opportunities || [];
  const totalCount = data?.totalCount || rawOpportunities.length;
  const oppData = await Promise.all(
    rawOpportunities.map(async (opp) => {
      const startupres = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/startups/${opp?.startupId}`,
      );
      const startupData = await startupres.json();

      return {
        ...opp,
        startupName: startupData?.name,
        startupStatus: startupData?.status,
        industry: startupData?.state,
      };
    }),
  );
  // console.log(oppData);
  return (
    <div>
      <BrowesOpp
        searchQ={searchQ}
        oppData={oppData}
        totalCount={totalCount}
      ></BrowesOpp>
    </div>
  );
};

export default OpportunitiesPage;
