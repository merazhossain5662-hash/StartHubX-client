import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const profileLayout = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });

  if (!session) {
    redirect("/login");
  }
  return <div>{children}</div>;
};

export default profileLayout;
