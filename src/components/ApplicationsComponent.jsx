"use client";
import React from "react";
import {
  ArrowUpRightFromSquare,
  Calendar,
  Envelope,
  PersonPlus,
  PersonXmark,
} from "@gravity-ui/icons";
import { Card, Link, Chip, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const ApplicationsComponent = ({ applicationsData, opportunityData }) => {
  const router = useRouter();
  const handlaBtn = async (reponse = "pending") => {
    const datal = {
      status: reponse,
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URI}/api/applications/${applicationsData?._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datal),
      },
    );
    const data = await res.json();
    alert(`Application ${reponse} succecfully!`);
    router.refresh();
  };
  return (
    <div
      className={`
              relative flex justify-between items-center
              mb-2
              rounded-2xl 
              bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#020617]
              border border-indigo-500/30
              hover:border-indigo-400
              transition-all duration-300
              shadow-[0_0_25px_rgba(99,102,241,0.15)]
              hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]
            `}
    >
      <Card className="w-full bg-transparent">
        <Card.Header className="space-y-3">
          <Card.Title>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-lg ">{opportunityData?.Title}</h1>
              {applicationsData?.status === "accepted" ? (
                <Chip
                  size="sm"
                  className="bg-[#0c2a23] text-[#10b981] font-medium border border-[#10b981]/20"
                >
                  accepted
                </Chip>
              ) : applicationsData?.status === "rejected" ? (
                <Chip
                  size="sm"
                  className="bg-[#391b1a] text-[#b91010] font-medium border border-[#b91010]/20"
                >
                  Rejected
                </Chip>
              ) : (
                <Chip
                  size="sm"
                  className="bg-yellow-950/40 text-yellow-500 font-medium border border-yellow-500/20"
                >
                  {applicationsData?.status}
                </Chip>
              )}
            </div>
          </Card.Title>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <Envelope size={14} />
              <span className="hover:text-gray-200 transition cursor-pointer">
                {applicationsData?.ApplicantEmail}
              </span>
            </div>
            {applicationsData?.createdAt && (
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{applicationsData?.createdAt}</span>
              </div>
            )}
          </div>

          <Link
            href={applicationsData?.gitubLink}
            rel="noopener noreferrer"
            target="_blank"
            className="text-sm space-x-1.5 text-[#7dbad2]"
          >
            <ArrowUpRightFromSquare /> <span>View Portfolio</span>
          </Link>
        </Card.Header>
        <Card.Footer className="bg-gray-800/50 p-3 rounded-xl">
          <span>
            <h1 className="text-sm text-gray-600 font-extralight">
              Motivation
            </h1>
            <p>{applicationsData?.motivation}</p>
          </span>
        </Card.Footer>
      </Card>

      {applicationsData?.status === "pending" ? (
        <div className="flex flex-col gap-3 mx-1">
          <Button
            onClick={() => handlaBtn("accepted")}
            className="flex text-green-600 rounded-md hover:text-green-600  bg-green-500/20  border border-green-700 hover:bg-green-600/10 hover:rounded-lg transition-all duration-300 ease-in-out hover:-translate-x-1 w-25  py-5 px-2"
          >
            <PersonPlus></PersonPlus>
            Accept
          </Button>
          <Button
            onClick={() => handlaBtn("rejected")}
            className="flex text-red-600/70 rounded-md hover:text-red-600  bg-red-500/20  border border-red-700 hover:bg-red-600/10 hover:rounded-lg transition-all duration-300 ease-in-out hover:-translate-x-1 w-25  py-5 px-2"
          >
            <PersonXmark></PersonXmark>
            Reject
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ApplicationsComponent;
