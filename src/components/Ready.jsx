import React from "react";
import { Card, Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";

const Ready = () => {
  return (
    <div className="bg-[#001321] py-5 h-80 px-7 -mt-4">
      <Card className="max-w-200 min-h-70 mx-auto bg-[#030e17] border-[#224764] border backdrop-blur-2xl ">
        <Card.Content className="flex flex-col items-center space-y-4 justify-center gap-2">
          <h1 className="text-xl text-white md:text-3xl">
            Ready to <span className="text-[#78d2ff]">Start</span> your team
            <span className="text-[#78d2ff] font-bold">?</span>
          </h1>
          <p className="text-sm text-center hover:text-[#8dd0f2] text-gray-700">
            Join thousands of founders and collaborators building the future
            together.
          </p>
          <div className="flex flex-col mx-auto md:flex-row md:gap-0.5 gap-4 items-center justify-center">
            <Button className="round min-w-70 min-h-12 bg-linear-to-r md:text-xl text-lg from-[#173b52] via-[#1e4360]  to-[#21435a] text-[#c4e1f0] py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              Get Started <ArrowRight className="inline-block ml-2" />
            </Button>
            <Button
              variant="outline"
              className="ml-4 min-w-70 min-h-12 py-2 rounded-xl px-4 md:text-xl text-lg text-[#c4e1f0] border-[#224764] hover:bg-[#173b52] hover:text-[#8dd0f2]"
            >
              Browse Opportunities
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Ready;
