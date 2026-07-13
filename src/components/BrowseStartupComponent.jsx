"use client";

import React, { useState, useMemo } from "react";
import { ListBox, Avatar, Select, Button, Chip } from "@heroui/react";
import { Magnifier, Funnel } from "@gravity-ui/icons";
import Link from "next/link";

const BrowseStartupComponent = ({ datas }) => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");
  const [stage, setStage] = useState("All");
  console.log(stage, "afcar", industry);

  // 🔍 Filtering logic
  const filteredData = useMemo(() => {
    return datas.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchIndustry = industry === "All" || item.state === industry;

      const matchStage =
        stage === "All" ||
        item.FundingStage.toLowerCase() === stage.toLowerCase();

      return matchSearch && matchIndustry && matchStage;
    });
  }, [datas, search, industry, stage]);

  // 🧠 Unique dropdown values
  const industries = ["All", ...new Set(datas.map((d) => d.state))];
  const stages = ["All", ...new Set(datas.map((d) => d.FundingStage))];

  return (
    <div className="min-h-screen  text-white px-6 py-10">
      {/* 🔥 Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          Browse <span className="text-purple-500">Startups</span>
        </h1>
        <p className="text-gray-400 mt-2">
          Discover innovative startups looking for talented collaborators.
        </p>
      </div>

      {/* 🔎 Filters */}
      <div className="max-w-5xl mx-auto space-y-4 mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search startups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0f172a] border border-gray-700 text-white"
          />
          <Magnifier className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Industry Select */}
          <Select
            aria-label="Select industry"
            className="w-full text-white"
            value={industry}
            onChange={(val) => setIndustry(val || "All")}
          >
            <Select.Trigger className="bg-[#0f172a] border border-gray-700 px-3 py-2 rounded-lg flex justify-between items-center w-full">
              <Select.Value placeholder="Select industry" />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox className="bg-[#0f172a] border border-gray-700 rounded-lg p-1 text-white">
                {industries.map((ind) => (
                  <ListBox.Item
                    key={ind}
                    id={ind}
                    textValue={ind}
                    className="p-2 cursor-pointer hover:bg-purple-600 rounded"
                  >
                    {ind}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Stage Select */}
          <Select
            aria-label="Select stage"
            className="w-full text-white"
            value={stage}
            onChange={(val) => setStage(val || "All")}
          >
            <Select.Trigger className="bg-[#0f172a] border border-gray-700 px-3 py-2 rounded-lg flex justify-between items-center w-full">
              <Select.Value placeholder="Select stage" />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox className="bg-[#0f172a] border border-gray-700 rounded-lg p-1 text-white">
                {stages.map((st) => (
                  <ListBox.Item
                    key={st}
                    id={st}
                    textValue={st}
                    className="p-2 cursor-pointer hover:bg-purple-600 rounded"
                  >
                    {st}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <Button color="secondary" className="px-6 py-2">
            <Funnel size={16} />
            Filter
          </Button>
        </div>
      </div>
      {/* 📦 Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Link key={item._id} href={`/Startups/${item._id}`}>
              <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-5 hover:border-purple-500 transition">
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
                <p className="text-sm text-gray-300 mb-4">{item.description}</p>

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
    </div>
  );
};

export default BrowseStartupComponent;
