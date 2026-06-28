import Image from "next/image";
import bgImage from "../assets/bg.png";
import React from "react";
import { Badge, Button } from "@heroui/react";
import { Aperture, ArrowRight } from "@gravity-ui/icons";

const Hero = () => {
  return (
    <div className="relative w-full min-h-150 md:h-175 lg:h-175">
      <Image
        src={bgImage}
        alt="Background"
        fill
        quality={100}
        unoptimized
        className="object-cover object-center -z-10 w-full max-h-180"
      />
      <div className="absolute space-y-8 my-10 md:my-19 mx-auto w-full flex flex-col justify-center items-center text-center px-4">
        <Badge
          placement="top"
          className="flex items-center gap-1 bg-[#1A374D] backdrop-blur-2xl text-[#8dd0f2] text-xs mx-auto rounded-xl border border-[#224764] p-1.5"
        >
          <Aperture className="text-[#4d798a]" /> The #1 Hub for Startup
          Builders
        </Badge>
        <div>
          <h1 className="text-5xl md:text-7xl font-semibold text-white">
            Ideas Need Teams
          </h1>
          <h1 className="text-5xl md:text-7xl font-bold text-[#4d798a] mb-4">
            Build Yours Here
          </h1>
        </div>
        <p className="text-sm md:text-lg text-[#4f6e85] font-light  mb-8">
          Connect with founders, developers, designers, and creators to turn
          ideas into real products. <br />
          Find your team, collaborate seamlessly, <br /> and bring your startup
          to life — faster and smarter.
        </p>
        <div className="flex flex-col md:flex-row md:gap-0.5 gap-4 items-center justify-center">
          <Button
            size="lg"
            className="round bg-linear-to-r text-lg from-[#173b52] via-[#1e4360]  to-[#21435a] text-[#c4e1f0] py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            Get Started <ArrowRight className="inline-block ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="ml-4 py-2 rounded-xl px-4 text-lg text-[#c4e1f0] border-[#224764] hover:bg-[#173b52] hover:text-[#8dd0f2]"
          >
            Browse Opportunities
          </Button>
        </div>
        <p className="text-xs font-light text-[#4f6e85]">
          Trusted by 500+ startups worldwide · No credit card required
        </p>
      </div>
    </div>
  );
};

export default Hero;
