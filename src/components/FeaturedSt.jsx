import React from "react";
import { Chip, Avatar } from "@heroui/react";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
const FeaturedSt = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/startups`);
  const datas = await res.json();
  const startups = datas.slice(0, 6);

  return (
    <div className="lg:w-8/12 w-10/12 mx-auto my-17 space-y-4">
      <div className="space-y-4">
        <h1>Discover</h1>

        <h1 className="text-[#8dd0f2] text-3xl">
          <span className="text-white">Featured </span>Startups
        </h1>
        <p className="text-sm text-gray-600">
          Explore innovative startups looking for talented people like you.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl ">
        {startups.length > 0 ? (
          startups.map((item) => (
            <Link
              className="min-h-30"
              key={item._id}
              href={`/Startups/${item._id}`}
            >
              <div className="bg-[#0f172a] h-full  w-full border border-gray-700 rounded-xl p-5 hover:border-slate-500 transition">
                {/* Top */}
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="size-16 rounded-2xl">
                    <Avatar.Image alt="Extra Large" src={item?.profileImage} />
                    <Avatar.Fallback className="bg-[#204561] text-lg">
                      {item.name?.[0].toUpperCase() || "?"}
                    </Avatar.Fallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-xs text-gray-400">{item.FounderEmail}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-4">{item.description}</p>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  <Chip size="sm" color="secondary" variant="flat">
                    {item.state}
                  </Chip>
                  <Chip size="sm" variant="bordered">
                    {item.FundingStage}
                  </Chip>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">
            No startups found.
          </p>
        )}
      </div>
      <div className="w-90 mx-auto">
        <Link className="w-full" href="/Startups">
          <button
            className="border mx-auto flex items-center gap-1.5 border-[#8dd0f2]/80
           text-[#8dd0f2]/80 p-2 text-sm rounded-lg "
          >
            View All Startups
            <ArrowRight></ArrowRight>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSt;
