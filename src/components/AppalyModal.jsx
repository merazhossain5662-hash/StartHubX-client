"use client";
import React, { useEffect, useState } from "react";
import { Envelope, Link, PaperPlane } from "@gravity-ui/icons";
import {
  Modal,
  Tooltip,
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import getDateStatus from "@/lib/actions/getDateStatus";
import { authClient } from "@/lib/auth-client";

const AppalyModal = ({ opportunityData, StartupData, user }) => {
  const router = useRouter();
  const userRole = user?.role?.toLowerCase();

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isApplaid, setIsApplaid] = useState(null);

  const expDate = getDateStatus(opportunityData?.date);

  // Helper function to extract auth token cleanly
  const getToken = async () => {
    const { data: jwt } = await authClient.token();
    return jwt?.token || jwt;
  };

  useEffect(() => {
    if (!user?.email || !opportunityData?._id) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        const token = await getToken();
        const applicationRes = await fetch(
          `${process.env.NEXT_PUBLIC_URI}/api/application/${user.email}/${opportunityData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (applicationRes.ok) {
          const applaidApplication = await applicationRes.json();
          if (isMounted) {
            setIsApplaid(applaidApplication);
          }
        }
      } catch (err) {
        console.error("Error fetching application status:", err);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [opportunityData?._id, user?.email]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target;
      const token = await getToken();

      const data = {
        ApplicantEmail:
          form.elements.namedItem("ApplicantEmail")?.value || user?.email,
        githubLink: form.elements.namedItem("githubLink")?.value,
        motivation: form.elements.namedItem("motivation")?.value,
        opportunityId: opportunityData?._id,
        opportunityTitle: opportunityData?.Title,
        startupId: StartupData?._id,
        status: "pending",
        isOrphan: false,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/application`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        alert(`Failed to submit: ${errData.message || "Server Error"}`);
        setLoading(false);
        return;
      }

      alert("Application submitted successfully!");
      setIsApplaid(true);
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Something went wrong while submitting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Trigger Buttons */}
      {!user ? (
        <Button
          onClick={() => router.push("/login")}
          className="w-full py-2 px-4 rounded-xl text-xs font-semibold border border-[#8dd0f2]/40 bg-[#8dd0f2]/10 backdrop-blur-md text-[#8dd0f2] hover:bg-[#8dd0f2]/20 hover:border-[#8dd0f2] hover:shadow-[0_0_15px_rgba(141,208,242,0.2)] transition duration-300"
        >
          Login To Apply
        </Button>
      ) : isApplaid ? (
        <Button
          className="w-full py-2 px-4 rounded-xl text-xs font-semibold border border-[#8dd0f2]/40 bg-yellow-400/25 backdrop-blur-md text-black transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          isDisabled
        >
          Applied
        </Button>
      ) : expDate < 0 ? (
        <Button
          className="w-full py-2 px-4 rounded-xl text-xs font-semibold border border-red-900/75 bg-red-400/25 backdrop-blur-md text-white transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          isDisabled
        >
          Opportunity Expired
        </Button>
      ) : userRole === "collaborator" ? (
        <Button
          className="w-full py-2 px-4 rounded-xl text-xs font-semibold border border-[#8dd0f2]/40 bg-[#8dd0f2]/10 backdrop-blur-md text-[#8dd0f2] hover:bg-[#8dd0f2]/20 hover:border-[#8dd0f2] hover:shadow-[0_0_15px_rgba(141,208,242,0.2)] transition duration-300"
          onPress={() => setIsOpen(true)}
        >
          Apply Now
        </Button>
      ) : (
        <Tooltip delay={0}>
          <Tooltip.Trigger>
            <Button isDisabled className="w-full">
              Apply Now
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Tooltip.Arrow />
            Only Collaborators can apply
          </Tooltip.Content>
        </Tooltip>
      )}

      {/* HeroUI Modal Structure */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-90 bg-[#03111b] border border-gray-800 transition rounded-2xl p-6">
              <Modal.CloseTrigger onPress={() => setIsOpen(false)} />
              <Modal.Header>
                <Modal.Heading className="text-xl text-white font-semibold">
                  Apply for Role
                </Modal.Heading>
                <p className="text-xs text-gray-400 mt-1">
                  {opportunityData?.Title} • {StartupData?.name}
                </p>
              </Modal.Header>
              <Modal.Body className="mt-4">
                <Form className="w-full space-y-4" onSubmit={onSubmit}>
                  <Fieldset className="space-y-4">
                    <FieldGroup className="space-y-4">
                      {/* APPLICANT EMAIL */}
                      <div className="flex flex-col">
                        <Label className="text-xs text-gray-400">
                          Applicant Email
                        </Label>
                        <div className="relative mt-1">
                          <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input
                            required
                            readOnly
                            name="ApplicantEmail"
                            type="email"
                            defaultValue={user?.email}
                            variant="secondary"
                            className="bg-gray-900 text-gray-400 border border-[#224764] focus:border-[#8dd0f2]/70 h-12 pl-10 w-full rounded-xl text-sm"
                          />
                        </div>
                      </div>

                      {/* PORTFOLIO / GITHUB LINK */}
                      <div className="flex flex-col">
                        <Label className="text-xs text-gray-400">
                          Portfolio / GitHub Link
                        </Label>
                        <div className="relative mt-1">
                          <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input
                            required
                            name="githubLink"
                            type="url"
                            placeholder="https://github.com/..."
                            variant="secondary"
                            className="bg-[#8dd0f2]/5 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 h-12 pl-10 w-full rounded-xl text-sm text-white"
                          />
                        </div>
                      </div>

                      {/* MOTIVATION MESSAGE */}
                      <TextField
                        isRequired
                        name="motivation"
                        className="flex flex-col gap-1"
                        validate={(val) =>
                          val.length < 10
                            ? "Motivation message must be at least 10 characters."
                            : null
                        }
                      >
                        <Label className="text-xs text-gray-400">
                          Motivation Message
                        </Label>
                        <TextArea
                          name="motivation"
                          required
                          className="h-28 w-full rounded-xl border border-[#224764] bg-[#8dd0f2]/5 focus:bg-transparent focus:border-[#8dd0f2]/70 p-3 text-sm text-white placeholder:text-gray-500"
                          placeholder="Why are you a great fit for this role?"
                        />
                        <Description className="text-[10px] text-gray-500">
                          Minimum 10 characters
                        </Description>
                        <FieldError className="text-xs text-red-400" />
                      </TextField>
                    </FieldGroup>

                    <Fieldset.Actions className="flex gap-2 mt-4">
                      <Button
                        type="submit"
                        isDisabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#173b52] via-[#1e4360] to-[#21435a] text-[#c4e1f0] rounded-xl py-3 text-sm font-medium hover:opacity-90 transition shadow-md"
                      >
                        <PaperPlane />
                        {loading ? "Submitting..." : "Submit Application"}
                      </Button>
                      <Button
                        type="button"
                        onPress={() => setIsOpen(false)}
                        variant="secondary"
                        className="w-full rounded-xl bg-[#8dd0f2]/5 text-[#8dd0f2] border border-gray-700 py-3 text-sm"
                      >
                        Cancel
                      </Button>
                    </Fieldset.Actions>
                  </Fieldset>
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default AppalyModal;
