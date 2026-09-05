import MystartupComponent from "@/components/MyStartUp";
import React from "react";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MystartupPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });
  console.log(session.user.email);
  const { token } = await auth.api.getToken({
    headers: await headers(), // some endpoints might require headers
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/startup/${session?.user?.email}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const startupData = await res.json();
  console.log("Startup Data:", startupData[0]); // Log the startup name to the console
  return (
    <div>
      <MystartupComponent
        email={session?.user?.email || null}
        startupData={startupData[0] || null}
      />
    </div>
  );
};

export default MystartupPage;
