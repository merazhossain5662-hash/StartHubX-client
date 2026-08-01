import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });

  if (!session) {
    redirect("/login");
  }

  if (session?.user?.role?.toLowerCase() !== "founder") {
    redirect("/unauthorized");
  }
  console.log(session?.user?.role);

  return <div>{children}</div>;
};

export default layout;
