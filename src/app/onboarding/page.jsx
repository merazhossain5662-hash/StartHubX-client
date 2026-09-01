"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const selectRole = async (chosenRole) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URI}/api/user/role/${session.user.email}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: chosenRole }),
      },
    );

    if (res.ok) {
      router.push("/dashboard");
    }
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-white text-xl">Select Your Account Type</h1>
      <div className="flex gap-4">
        <button onClick={() => selectRole("Founder")}>Founder</button>
        <button onClick={() => selectRole("Collaborator")}>Collaborator</button>
      </div>
    </div>
  );
}
