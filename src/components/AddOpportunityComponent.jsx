"use client";
import React, { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import {
  Form,
  Input,
  Label,
  Button,
  Link,
  DatePicker,
  Select,
  ListBox,
} from "@heroui/react";

import { Date } from "@/components/Date";
import { redirect, useRouter } from "next/navigation";

const AddOpportunityComponent = ({ startupData }) => {
  const router = useRouter();
  const [value, setValue] = useState(null);
  const currentDate = today(getLocalTimeZone());
  const isInvalid = value != null && value.compare(currentDate) < 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    console.log("Form Data Entries:", Array.from(formData.entries()));
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
    data.startupId = startupData?._id;
    data.Skills = data?.Skills.split(",");
    console.log("Form Data:", data);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URI}/api/opportunity`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    redirect("/dashboard/founder/manage-opportunities");
  };
  return (
    <div>
      <h1 className="text-lg md:text-2xl ">My Startup</h1>
      <p className="text-xs md:text-sm text-gray-500">
        Create and manage your startup profile.
      </p>
      {startupData ? (
        <div>
          {/* Add your startup profile content here */}
          <div className="w-full md:max-w-xl max-w-md rounded-3xl border border-gray-800 shadow-md shadow-[#022b3f]/70 bg-transparent p-7 backdrop-grayscale-25 hover:backdrop-brightness-110 ">
            {/* HEADER */}

            <Form onSubmit={onSubmit} className="space-y-5 ">
              <div className="flex flex-col">
                <Label className="text-xs text-gray-400">Role Title</Label>

                <div className="relative mt-1">
                  <Input
                    required
                    name="Title"
                    variant="secondary"
                    placeholder="e.g. Senior React Developer"
                    className=" bg-gray-900  focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-12 pl-5 w-full"
                  />
                </div>
              </div>

              {/* NAME */}
              <div className="flex flex-col">
                <Label className="text-xs text-gray-400">Required Skills</Label>

                <div className="relative mt-1">
                  <Input
                    required
                    name="Skills"
                    placeholder="e.g. React, TypeScript, Node.js"
                    variant="secondary"
                    className="  bg-gray-900  focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-12 pl-5 w-full"
                  />
                </div>
              </div>

              {/* IMAGE */}

              {/* PASSWORD */}
              <div className="flex md:flex-row flex-col gap-3">
                <Select
                  className="w-full "
                  isRequired
                  placeholder="Select Work Type "
                  name="state"
                >
                  <label className="text-xs text-gray-400">Work Type</label>
                  <Select.Trigger className="h-11 w-full rounded-xl border border-[#224764] bg-gray-900 focus:bg-transparent focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70  px-4 text-sm text-white placeholder:text-gray-400">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-transparent backdrop-blur-sm border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 rounded-2xl">
                    <ListBox className="bg-transparent ">
                      <ListBox.Item
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                        id="Remote"
                        textValue="Remote"
                      >
                        Remote
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                        id="Onsite"
                        textValue="Onsite"
                      >
                        Onsite
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                        id="Hybrid"
                        textValue="Hybrid"
                      >
                        Hybrid
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
                {/*Commitment Level */}
                <Select
                  className="w-full "
                  isRequired
                  placeholder="Select Commitment Level"
                  name="CommitmentLevel"
                >
                  <label className="text-xs text-gray-400">
                    Commitment Level
                  </label>
                  <Select.Trigger className="w-full h-11 rounded-xl border border-[#224764] bg-gray-900 focus:bg-transparent focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70  px-4 text-sm text-white placeholder:text-gray-400">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-transparent backdrop-blur-sm border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 rounded-2xl">
                    <ListBox className="bg-transparent ">
                      <ListBox.Item
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                        id="Full-Time"
                        textValue="Full-Time"
                      >
                        Full-Time
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                        id="Part-Time"
                        textValue="Part-Time"
                      >
                        Part-Time
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                        id="Contract"
                        textValue="Contract"
                      >
                        Contract
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
              {/* CONFIRM */}
              <DatePicker
                isRequired
                className="w-full "
                isInvalid={isInvalid}
                minValue={currentDate}
                name="date"
                value={value}
                onChange={setValue}
              >
                <Date className="w-full flex bg-transparent backdrop-blur-lg border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 rounded-2xl" />
              </DatePicker>
              {/* SUBMIT */}
              <Button
                type="submit"
                className="w-full rounded-xl py-5 text-sm font-medium bg-linear-to-r from-[#2a587b] via-[#437fac] to-[#6bc8f6] hover:opacity-90 transition"
              >
                Post Opportunity
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <div className="bg-red-500/20 rounded-lg p-4 text-xs max-w-lg">
          <h1 className=" text-red-600">No startup found</h1>
          <p>
            You need to{" "}
            <Link href="/dashboard/founder/mystartup">
              create a startup profile
            </Link>{" "}
            before you can add an opportunity.
          </p>
        </div>
      )}
    </div>
  );
};

export default AddOpportunityComponent;
