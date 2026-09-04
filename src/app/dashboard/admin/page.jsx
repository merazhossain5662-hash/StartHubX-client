import AdminOverview from "@/components/AdminOverview";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const adminDashboard = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  console.log("Token:", token); // Log the token to verify it's being retrieved correctly
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/admin/overview`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return <AdminOverview data={data} />;
};

export default adminDashboard;
