import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const checkoutLayout = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });

  if (!session) {
    redirect("/login");
  }
  if (session?.user?.role?.toLowerCase() !== "founder") {
    redirect("/");
  }
  if (session?.user?.plan === "premium") {
    redirect("/dashboard/founder");
  }
  return <div>{children}</div>;
};

export default checkoutLayout;
