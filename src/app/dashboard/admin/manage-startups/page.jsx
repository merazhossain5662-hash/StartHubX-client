import StartupsTable from "@/components/StartupsTable";
import React from "react";

const manageStartups = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/admin/startups`);
  const startups = await res.json();
  return (
    <div>
      <StartupsTable startups={startups || []} />
    </div>
  );
};

export default manageStartups;
