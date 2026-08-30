import React from "react";
import { Chip } from "@heroui/react";
import { Globe, Clock, Factory, ArrowRight } from "@gravity-ui/icons";
import getDateStatus from "@/lib/actions/getDateStatus";
import Link from "next/link";
const LatestOpp = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/opportunity?limit=6`,
  );
  const { opportunities } = await res.json();

  const Openings = await Promise.all(
    opportunities.map(async (opp) => {
      const startupres = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/startups/${opp?.startupId}`,
      );
      const startupData = await startupres.json();
      return {
        ...opp,
        startupName: startupData?.name,
      };
    }),
  );
  console.log("opphl fuiwehafb v", Openings);

  return (
    <div className="bg-[#001321] py-5 min-h-80 ">
      <div className="lg:w-8/12 w-10/12 mx-auto my-17 space-y-6">
        <div className="space-y-4 text-[#8dd0f2]">
          <h1>Opportunities</h1>

          <h1 className="text-[#8dd0f2] text-3xl">
            <span className="text-white">Latest </span>Openings
          </h1>
          <p className="text-sm text-gray-600">
            Explore innovative startups looking for talented people like you.
          </p>
        </div>
        <div>
          {Openings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Openings.map((role) => {
                const expDate = getDateStatus(role.date);

                return (
                  <div
                    key={role._id}
                    className="bg-[#0f172a]/80 shadow-2xl  border border-gray-700/50 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-700/80 transition space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <h3 className=" font-semibold text-gray-100">
                          {role.Title}
                        </h3>
                        <Chip
                          size="sm"
                          className={`text-xs font-extralight border ${expDate < 3 ? "border-rose-500/30 bg-rose-500/10 text-rose-500" : expDate < 16 ? "border-amber-500/30 bg-amber-500/10 text-amber-500" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"}`}
                        >
                          {expDate < 0 ? "Expired" : `${expDate}d left`}
                        </Chip>
                      </div>
                      <p className="text-xs text-[#8dd0f2] font-light flex items-center gap-1.5">
                        <Factory className="text-xs size-4 text-gray-600"></Factory>
                        {role.startupName}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {role.Skills?.map((skill, idx) => (
                          <Chip
                            key={idx}
                            size="sm"
                            variant="flat"
                            className="bg-[#0f172a] text-[#8dd0f2]/70 border border-[#8dd0f2]/30 text-[11px] font-medium"
                          >
                            {skill}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Remote/Commitment meta items */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Globe size={8} className="text-gray-600" />
                          <span>{role.state?.toLowerCase()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={8} className="text-gray-600" />
                          <span>{role.CommitmentLevel?.toLowerCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border border-dashed border-gray-800 rounded-2xl p-12 text-center">
              <p className="text-gray-500 text-sm">
                No open positions are available right now.
              </p>
            </div>
          )}
        </div>
        <div className="w-90 mx-auto">
          <Link className="w-full" href="/Opportunities">
            <button
              className="border mx-auto flex items-center gap-1.5 border-[#8dd0f2]/80
           text-[#8dd0f2]/80 p-2 text-sm rounded-lg "
            >
              View All Opportunities
              <ArrowRight></ArrowRight>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestOpp;
