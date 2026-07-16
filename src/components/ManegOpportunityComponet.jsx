import React from "react";
import { Button, Card, Chip } from "@heroui/react";
import {
  Globe,
  Calendar,
  Briefcase,
  Pencil,
  TrashBin,
} from "@gravity-ui/icons";
import DeleteOpportunityButton from "./DeleteOpportunityBtn";
import EditOpportunityModal from "./EditOpportunity";

const ManageOpportunityComponent = ({ opportunityData, startupData }) => {
  console.log("Opportunity Data in Component:", opportunityData);
  return (
    <div>
      <h1 className="text-lg md:text-2xl ">Manage Opportunities</h1>
      <p className="text-sm md:text-base text-gray-400">
        {opportunityData.length} opportunity(s) posted.
      </p>
      {opportunityData.length > 0 ? (
        <div className="space-y-4">
          {opportunityData.map((item) => (
            <div
              key={item._id}
              className="
              relative flex justify-between items-center
              rounded-2xl p-5
              bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#020617]
              border border-indigo-500/30
              hover:border-indigo-400
              transition-all duration-300
              shadow-[0_0_25px_rgba(99,102,241,0.15)]
              hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]
            "
            >
              {/* LEFT CONTENT */}
              <div className="space-y-3">
                {/* Title */}
                <h2 className="text-lg font-semibold text-white">
                  {item.Title}
                </h2>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {item.Skills?.map((skill, i) => (
                    <Chip
                      key={i}
                      size="sm"
                      variant="flat"
                      className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    >
                      {skill.trim()}
                    </Chip>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {item.state}
                  </div>

                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {item.CommitmentLevel}
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Deadline: {item.date}
                  </div>
                </div>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex items-center gap-2">
                <EditOpportunityModal opportunity={item} />

                <DeleteOpportunityButton id={item._id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Card className="min-w-70 bg-[#03111b] space-y-3 hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border min-h-40 backdrop-blur-2xl ">
            <Card.Content className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-xl">No Opportunities posted yet.</h1>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ManageOpportunityComponent;
