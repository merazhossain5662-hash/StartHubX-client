import StartupDetaills from "@/components/StartupDetaills";
import React from "react";

const startupDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/startups/${id}`);

  const data = await res.json();
  const opportunityRes = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/opportunitise/${data?._id}`,
  );
  const opportunityData = await opportunityRes.json();
  return (
    <div>
      <StartupDetaills
        data={data}
        opportunityData={opportunityData}
      ></StartupDetaills>
    </div>
  );
};

export default startupDetailsPage;
