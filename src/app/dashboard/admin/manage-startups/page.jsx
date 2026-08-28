import React from "react";

const manageStartups = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/admin/startups`);
  const startups = await res.json();
  return (
    <div>
      <h1>Manage Startups</h1>
      <p>{startups.length} startups found.</p>
    </div>
  );
};

export default manageStartups;
