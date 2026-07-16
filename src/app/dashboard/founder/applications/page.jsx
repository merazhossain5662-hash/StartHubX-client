import ApplicationsComponent from "@/components/ApplicationsComponent";
import { auth } from "@/lib/auth";
import { Card } from "@heroui/react";
import { headers } from "next/headers";
import React from "react";

const applicationPage = async () => {
  const { user, isPending } = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/startup/${user?.email}`,
  );
  const startupData = await res.json();
  const startupId = startupData[0]?._id;

  const ApplicationsRes = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/applications/${startupId}`,
  );
  const applicationsData = await ApplicationsRes.json();
  const activeApplications =
    applicationsData?.filter((app) => !app?.isOrphan) || [];
  return (
    <>
      <h1>Applications</h1>
      {applicationsData?.length > 0 && (
        <p>{activeApplications?.length || "0"} application(s) received.</p>
      )}
      {activeApplications?.length == 0 ? (
        <div>
          <Card className="min-w-70 bg-[#03111b] space-y-3 hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border min-h-40 backdrop-blur-2xl ">
            <Card.Content className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-xl">No Applications received.</h1>
            </Card.Content>
          </Card>
        </div>
      ) : (
        <>
          {activeApplications.map(async (Data) => {
            const opportunityRes = await fetch(
              `${process.env.NEXT_PUBLIC_URI}/api/opportunity/${Data?.opportunityId}`,
            );
            const opportunityData = await opportunityRes.json();
            return (
              <ApplicationsComponent
                applicationsData={Data}
                opportunityData={opportunityData}
              ></ApplicationsComponent>
            );
          })}
        </>
      )}
    </>
  );
};

export default applicationPage;
