import BrowesOpp from "@/components/BrowesOpp";
import React from "react";

const OpportunitiesPage = async ({ searchParams }) => {
  const searchQ = await searchParams;
  const urlSearchQ = new URLSearchParams(searchQ);
  const searcString = urlSearchQ.toString();
  console.log(searcString);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/opportunity?${searcString}`,
  );
  const datas = await res.json();

  const oppData = await Promise.all(
    datas.map(async (opp) => {
      const startupres = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/startups/${opp?.startupId}`,
      );
      const startupData = await startupres.json();

      return {
        ...opp,
        startupName: startupData?.name,
        industry: startupData?.state,
      };
    }),
  );
  return (
    <div>
      <BrowesOpp searchQ={searchQ} oppData={oppData}></BrowesOpp>
    </div>
  );
};

export default OpportunitiesPage;
