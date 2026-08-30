import AdminOverview from "@/components/AdminOverview";
import React from "react";

const adminDashboard = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/overview`,
  );
  const data = await res.json();
  return <AdminOverview data={data} />;
};

export default adminDashboard;
