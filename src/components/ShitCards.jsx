import React from "react";
import { Card } from "@heroui/react";
import { ChartLineArrowUp, Persons, Rocket, Star } from "@gravity-ui/icons";
const ShitCards = () => {
  return (
    <div className="flex items-center w-10/12 justify-center gap-5 my-8 md:my-2 mx-auto flex-wrap md:flex-row flex-col">
      <div>
        <Card className="min-w-70 bg-[#03111b] space-y-3 hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border backdrop-blur-2xl ">
          <Card.Content className="flex flex-col items-center justify-center gap-2">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1A374D] backdrop-blur-2xl text-[#8dd0f2] text-xs mx-auto border border-[#224764] p-1.5">
              <Rocket className="text-[#8dd0f2] size-7" />
            </span>
            <h1 className="text-3xl">500+</h1>
            <p className="text-lg hover:text-[#8dd0f2] text-gray-700">
              Active Startups
            </p>
          </Card.Content>
        </Card>
      </div>
      <div>
        <Card className="min-w-70 bg-[#03111b] space-y-3 hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border backdrop-blur-2xl ">
          <Card.Content className="flex flex-col items-center justify-center gap-2">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1A374D] backdrop-blur-2xl text-[#8dd0f2] text-xs mx-auto border border-[#224764] p-1.5">
              <Persons className="text-[#8dd0f2] size-7" />
            </span>
            <h1 className="text-3xl">2,400+</h1>
            <p className="text-lg hover:text-[#8dd0f2] text-gray-700">
              Collaborators
            </p>
          </Card.Content>
        </Card>
      </div>
      <div>
        <Card className="min-w-70 bg-[#03111b] space-y-3 hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border backdrop-blur-2xl ">
          <Card.Content className="flex flex-col items-center justify-center gap-2">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1A374D] backdrop-blur-2xl text-[#8dd0f2] text-xs mx-auto border border-[#224764] p-1.5">
              <ChartLineArrowUp className="text-[#8dd0f2] size-7" />
            </span>
            <h1 className="text-3xl">$12M+</h1>
            <p className="text-lg hover:text-[#8dd0f2] text-gray-700">
              Funding Raised
            </p>
          </Card.Content>
        </Card>
      </div>
      <div>
        <Card className="min-w-70 bg-[#03111b] space-y-3 hover:bg-[#030e17] border-gray-800 hover:border-[#224764] border backdrop-blur-2xl ">
          <Card.Content className="flex flex-col items-center justify-center gap-2">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1A374D] backdrop-blur-2xl text-[#8dd0f2] text-xs mx-auto border border-[#224764] p-1.5">
              <Star className="text-[#8dd0f2] size-7" />
            </span>
            <h1 className="text-3xl">98%</h1>
            <p className="text-lg hover:text-[#8dd0f2] text-gray-700">
              Success Rate
            </p>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default ShitCards;
