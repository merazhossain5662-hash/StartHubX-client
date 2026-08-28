import StartupsTable from "@/components/StartupsTable";
import React from "react";

const manageStartups = async () => {
  const searchQ = await searchParams;
  const urlSearchQ = new URLSearchParams(searchQ);
  const searcString = urlSearchQ.toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/admin/startups?${searcString}`,
  );
  const startups = await res.json();
  return (
    <div>
      <StartupsTable startups={startups || []} />
    </div>
  );
};

export default manageStartups;
