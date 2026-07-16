import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const myApplicationsPage = async () => {
  const { user, isPending } = await auth.api.getSession({
    headers: await headers(),
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/application/${user?.email}`,
  );
  const data = await res.json();
  return <div>{data.length}</div>;
};

export default myApplicationsPage;
