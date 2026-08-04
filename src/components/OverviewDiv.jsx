import React from "react";
import { Card } from "@heroui/react";
import { Briefcase, SquareArticle, PersonPlus } from "@gravity-ui/icons";

const OverviewDiv = ({ opportunityData = [], activeApplications = [] }) => {
  const acceptedMembers =
    activeApplications?.filter((app) => app?.status === "approved") || [];

  const oppCount = Array.isArray(opportunityData) ? opportunityData.length : 0;
  const appCount = Array.isArray(activeApplications)
    ? activeApplications.length
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {/* Total Opportunities */}
      <div>
        <Card className="min-w-70 h-30 bg-[#03111b] space-y-3 hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border backdrop-blur-2xl">
          <Card.Content className="flex flex-row items-center gap-3">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1A374D] backdrop-blur-2xl text-[#8dd0f2] text-xs border border-[#224764] p-2">
              <Briefcase className="text-[#8dd0f2] size-7" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-white">{oppCount}</h1>
              <p className="text-sm hover:text-[#8dd0f2] text-gray-400">
                Total Opportunities
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Total Applications */}
      <div>
        <Card className="min-w-70 h-30 bg-[#03111b] space-y-3 hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border backdrop-blur-2xl">
          <Card.Content className="flex flex-row items-center gap-3">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1A374D] backdrop-blur-2xl text-[#8dd0f2] text-xs border border-[#224764] p-2">
              <SquareArticle className="text-[#8dd0f2] size-7" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-white">{appCount}</h1>
              <p className="text-sm hover:text-[#8dd0f2] text-gray-400">
                Total Applications
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Accepted Members */}
      <div>
        <Card className="min-w-70 h-30 bg-[#03111b] space-y-3 hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border backdrop-blur-2xl">
          <Card.Content className="flex flex-row items-center gap-3">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-900/30 backdrop-blur-2xl text-[#8dd0f2] text-xs border border-green-400/50 p-2">
              <PersonPlus className="text-green-400/50 size-7" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {acceptedMembers.length}
              </h1>
              <p className="text-sm hover:text-[#8dd0f2] text-gray-400">
                Accepted Members
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default OverviewDiv;
