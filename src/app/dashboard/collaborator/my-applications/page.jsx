import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { Card } from "@heroui/react";
import { MyApplicationsTable } from "@/components/MyApplicationsTable";

const myApplicationsPage = async () => {
  const { user, isPending } = await auth.api.getSession({
    headers: await headers(),
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/application/${user?.email}`,
  );
  const data = await res.json();
  const finalData = await Promise.all(
    data.map(async (app) => {
      const opportunityRes = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/opportunity/${app?.opportunityId}`,
      );
      const opportunityData = await opportunityRes.json();
      const startupres = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/startups/${app?.startupId}`,
      );
      const startupData = await startupres.json();
      return {
        ...app,
        oppTitle: opportunityData?.Title,
        startupName: startupData?.name,
      };
    }),
  );
  return (
    <div>
      <h1 className="text-2xl">My Applications</h1>
      <p className="text-sm text-gray-600 font-extralight">
        {data.length} application(s) submitted.
      </p>
      {data.length > 0 ? (
        <>
          <MyApplicationsTable
            applicationsData={finalData}
          ></MyApplicationsTable>
        </>
      ) : (
        <div>
          <Card className="min-w-70 bg-[#03111b] space-y-3 hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border min-h-40 backdrop-blur-2xl ">
            <Card.Content className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-lg">
                You haven't applied to any opportunities yet.
              </h1>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
};

export default myApplicationsPage;
