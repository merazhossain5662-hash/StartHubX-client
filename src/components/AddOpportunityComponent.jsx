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
  ProgressBar,
} from "@heroui/react";

import { Date } from "@/components/Date";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const AddOpportunityComponent = ({ startupData, totalCount, userPlan }) => {
  const FREE_LIMIT = 3;
  const isFreePlan = userPlan === "free" || !userPlan;
  const isLimitReached = isFreePlan && totalCount >= FREE_LIMIT;
  const router = useRouter();

  // State bindings for controlled custom fields
  const [value, setValue] = useState(null);
  const [workType, setWorkType] = useState("");
  const [commitmentLevel, setCommitmentLevel] = useState("");
  const [loading, setLoading] = useState(false);

  const currentDate = today(getLocalTimeZone());
  const isInvalid = value != null && value.compare(currentDate) < 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Retrieve raw auth token
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token || tokenRes?.data;

      const form = e.target;

      // 2. Format required payload safely
      const rawSkills = form.elements.namedItem("Skills")?.value || "";
      const skillsArray = rawSkills
        ? rawSkills.split(",").map((s) => s.trim())
        : [];

      const data = {
        Title: form.elements.namedItem("Title")?.value,
        Skills: skillsArray,
        workType: workType,
        CommitmentLevel: commitmentLevel,
        date: value ? value.toString() : null, // Converts CalendarDate to ISO/String
        startupId: startupData?._id,
        industry: startupData?.state,
      };

      // 3. Make POST request with Authorization header
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/opportunity`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(`Error: ${errorData.message || "Failed to post opportunity."}`);
        setLoading(false);
        return;
      }

      alert("Opportunity added successfully!");

      // 4. Client-side navigation replaces redirect()
      router.push("/dashboard/founder/manage-opportunities");
      router.refresh();
    } catch (err) {
      console.error("Submission Error:", err);
      alert("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {startupData ? (
        <div className="w-full max-w-xl space-y-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Add Opportunity
            </h1>
            <p className="text-xs md:text-sm text-gray-400">
              Post a role for your startup.{" "}
              {isFreePlan && (
                <span className="text-amber-400 font-medium">
                  ({totalCount}/{FREE_LIMIT} free slots used)
                </span>
              )}
            </p>
          </div>

          {isFreePlan && (
            <ProgressBar
              value={totalCount}
              minValue={0}
              maxValue={FREE_LIMIT}
              valueLabel={`${totalCount}/${FREE_LIMIT}`}
              color={isLimitReached ? "danger" : "accent"}
              className="w-full space-y-1.5"
            >
              <div className="flex justify-between text-xs text-gray-400">
                <Label>Free Opportunity Limit</Label>
                <ProgressBar.Output />
              </div>
              <ProgressBar.Track className="bg-gray-800 rounded-full h-2 w-full">
                <ProgressBar.Fill />
              </ProgressBar.Track>
            </ProgressBar>
          )}

          {isLimitReached && (
            <div className="rounded-2xl border border-amber-600/40 bg-amber-950/20 p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm">
                <span>⚡</span>
                <h2>Premium Required</h2>
              </div>
              <p className="text-xs text-gray-300">
                You've used all {FREE_LIMIT} free opportunity slots. Upgrade to
                post unlimited opportunities.
              </p>
              <Link
                href="/upgrade"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-xs font-semibold text-black hover:opacity-90 transition"
              >
                Upgrade — $29.99
              </Link>
            </div>
          )}

          <div className="w-full md:max-w-xl max-w-md rounded-3xl border border-gray-800 shadow-md shadow-[#022b3f]/70 bg-transparent p-7 backdrop-grayscale-25 hover:backdrop-brightness-110 ">
            <Form onSubmit={onSubmit} className="space-y-5 ">
              <div className="flex flex-col">
                <Label className="text-xs text-gray-400">Role Title</Label>
                <div className="relative mt-1">
                  <Input
                    required
                    name="Title"
                    variant="secondary"
                    placeholder="e.g. Senior React Developer"
                    className="bg-gray-900 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-12 pl-5 w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <Label className="text-xs text-gray-400">Required Skills</Label>
                <div className="relative mt-1">
                  <Input
                    required
                    name="Skills"
                    placeholder="e.g. React, TypeScript, Node.js"
                    variant="secondary"
                    className="bg-gray-900 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-12 pl-5 w-full"
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-3">
                {/* Work Type Select */}
                <Select
                  className="w-full"
                  isRequired
                  placeholder="Select Work Type"
                  name="workType"
                  onSelectionChange={(keys) => setWorkType(Array.from(keys)[0])}
                >
                  <label className="text-xs text-gray-400">Work Type</label>
                  <Select.Trigger className="h-11 w-full rounded-xl border border-[#224764] bg-gray-900 focus:bg-transparent focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 px-4 text-sm text-white placeholder:text-gray-400">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-transparent backdrop-blur-sm border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 rounded-2xl">
                    <ListBox className="bg-transparent">
                      <ListBox.Item
                        id="Remote"
                        textValue="Remote"
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
                      >
                        Remote
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        id="Onsite"
                        textValue="Onsite"
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
                      >
                        Onsite
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        id="Hybrid"
                        textValue="Hybrid"
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
                      >
                        Hybrid
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* Commitment Level Select */}
                <Select
                  className="w-full"
                  isRequired
                  placeholder="Select Commitment Level"
                  name="CommitmentLevel"
                  onSelectionChange={(keys) =>
                    setCommitmentLevel(Array.from(keys)[0])
                  }
                >
                  <label className="text-xs text-gray-400">
                    Commitment Level
                  </label>
                  <Select.Trigger className="w-full h-11 rounded-xl border border-[#224764] bg-gray-900 focus:bg-transparent focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 px-4 text-sm text-white placeholder:text-gray-400">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-transparent backdrop-blur-sm border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 rounded-2xl">
                    <ListBox className="bg-transparent">
                      <ListBox.Item
                        id="Full-Time"
                        textValue="Full-Time"
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
                      >
                        Full-Time
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        id="Part-Time"
                        textValue="Part-Time"
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
                      >
                        Part-Time
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        id="Contract"
                        textValue="Contract"
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
                      >
                        Contract
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <DatePicker
                isRequired
                className="w-full"
                isInvalid={isInvalid}
                minValue={currentDate}
                name="date"
                value={value}
                onChange={setValue}
              >
                <Date className="w-full flex bg-transparent backdrop-blur-lg border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 rounded-2xl" />
              </DatePicker>

              <Button
                type="submit"
                isDisabled={isLimitReached || loading}
                className="w-full rounded-xl py-5 text-sm font-medium bg-gradient-to-r from-[#2a587b] via-[#437fac] to-[#6bc8f6] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Submitting..."
                  : isLimitReached
                    ? "Limit Reached"
                    : "Post Opportunity"}
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <div className="bg-red-500/20 rounded-lg p-4 text-xs max-w-lg">
          <h1 className="text-red-600 font-semibold">No startup found</h1>
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
