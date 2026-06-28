import { Briefcase, Globe, SealCheck, Thunderbolt } from "@gravity-ui/icons";
import React from "react";
import { Card } from "@heroui/react";

const WhyStarthub = () => {
  return (
    <div className="w-10/12 mx-auto min-h-150 md:min-h-160 text-center px-4 py-5 space-y-4 my-5 md:my-10">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Why <span className="text-[#8dd0f2]">StartHub?</span>
        </h1>
        <p className="text-gray-500">
          Everything you need to find your perfect startup match.
        </p>
      </div>
      <div className=" grid grid-cols-1 gap-3 md:gap-1 md:grid-cols-2 lg:grid-cols-4 mt-8">
        <div>
          <Card className="max-w-80 min-h-70 bg-[#03111b]  hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border backdrop-blur-2xl ">
            <Card.Content className="flex flex-col space-y-3 items-center justify-center gap-2">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1A374D] backdrop-blur-2xl text-[#8dd0f2] text-xs mx-auto border border-[#224764] p-1.5">
                <Thunderbolt className="text-[#8dd0f2] size-7" />
              </span>
              <h1 className="text-xl">Lightning Fast</h1>
              <p className=" hover:text-[#8dd0f2] text-gray-700">
                Post opportunities and receive applications within hours, not
                weeks.
              </p>
            </Card.Content>
          </Card>
        </div>
        <div>
          <Card className="max-w-80 min-h-70 bg-[#03111b]  hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border backdrop-blur-2xl ">
            <Card.Content className="flex flex-col space-y-3 items-center justify-center gap-2">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1A374D] backdrop-blur-2xl text-[#8dd0f2] text-xs mx-auto border border-[#224764] p-1.5">
                <Briefcase className="text-[#8dd0f2] size-7" />
              </span>
              <h1 className="text-xl">All Roles</h1>
              <p className=" hover:text-[#8dd0f2] text-gray-700">
                Developers, designers, marketers, and 50+ other professional
                roles.
              </p>
            </Card.Content>
          </Card>
        </div>
        <div>
          <Card className="max-w-80 min-h-70 bg-[#03111b]  hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border backdrop-blur-2xl ">
            <Card.Content className="flex flex-col space-y-3 items-center justify-center gap-2">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1A374D] backdrop-blur-2xl text-[#8dd0f2] text-xs mx-auto border border-[#224764] p-1.5">
                <SealCheck className="text-[#8dd0f2] size-7" />
              </span>
              <h1 className="text-xl">Verified Profiles</h1>
              <p className=" hover:text-[#8dd0f2] text-gray-700">
                Every collaborator is verified with portfolio links and skill
                endorsements.
              </p>
            </Card.Content>
          </Card>
        </div>
        <div>
          <Card className="max-w-80 min-h-70 bg-[#03111b] hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border backdrop-blur-2xl ">
            <Card.Content className="flex flex-col space-y-3 items-center justify-center gap-2">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1A374D] backdrop-blur-2xl text-[#8dd0f2] text-xs mx-auto border border-[#224764] p-1.5">
                <Globe className="text-[#8dd0f2] size-7" />
              </span>
              <h1 className="text-xl">Global Reach</h1>
              <p className=" hover:text-[#8dd0f2] text-gray-700">
                Connect with talent from over 80 countries around the world
              </p>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WhyStarthub;
