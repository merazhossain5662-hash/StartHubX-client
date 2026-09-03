import StartupsTable from "@/components/StartupsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const manageStartups = async ({ searchParams }) => {
  const searchQ = await searchParams;
  const search = searchQ?.search || "";

  const { token } = auth.api.getToken({
    headers: await headers(),
  });
  const queryString = search ? `?search=${encodeURIComponent(search)}` : "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/admin/startups${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const startups = await res.json();
  return (
    <div>
      <StartupsTable startups={startups || []} />
    </div>
  );
};

export default manageStartups;
