import StartupsTable from "@/components/StartupsTable";
import React from "react";

const manageStartups = async ({ searchParams }) => {
  const searchQ = await searchParams;
  const search = searchQ?.search || "";

  // Append query string safely
  const queryString = search ? `?search=${encodeURIComponent(search)}` : "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/admin/startups${queryString}`,
  );
  const startups = await res.json();
  return (
    <div>
      <StartupsTable startups={startups || []} />
    </div>
  );
};

export default manageStartups;
