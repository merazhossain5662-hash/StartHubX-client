"use client";
import React, { useState } from "react";
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
import { redirect } from "next/navigation";
const AppalyModal = ({ opportunityData, StartupData, user, userEmail }) => {
  const userRole = user?.role.toLowerCase();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    data.opportunityId = opportunityData._id;
    data.startupId = StartupData._id;
    await fetch(`${process.env.NEXT_PUBLIC_URI}/api/application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    alert("Form submitted successfully!");

    setIsOpen(false);
  };

  return (
    <div>
      <Modal>
        {!user ? (
          <Button
            onClick={() => redirect("/login")}
            className="w-full rounded-lg bg-[#8dd0f2]/7 border border-gray-700"
          >
            Login To Applay
          </Button>
        ) : userRole === "collaborator" ? (
          <Button onPress={() => setIsOpen(true)}>Applay Now</Button>
        ) : (
          <Tooltip delay={0}>
            <Tooltip.Trigger>
              <Button isDisabled>Applay Now</Button>{" "}
            </Tooltip.Trigger>
            <Tooltip.Content>
              <Tooltip.Arrow />
              Only Collaborators can applay{" "}
            </Tooltip.Content>
          </Tooltip>
        )}
        <Modal.Backdrop
          variant={"blur"}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-90 bg-transparent border border-gray-800  transition rounded-2xl">
              <Modal.CloseTrigger onPress={() => setIsOpen(false)} />
              <Modal.Header>
                <Modal.Heading className="text-xl">
                  Apply for Role
                </Modal.Heading>
                <h1>
                  {opportunityData?.Title} . {StartupData?.name}
                </h1>
              </Modal.Header>
              <Modal.Body>
                <Form className="w-full max-w-96" onSubmit={onSubmit}>
                  <Fieldset>
                    <FieldGroup>
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
                            defaultValue={userEmail}
                            variant="secondary"
                            className=" bg-gray-900 text-gray-600 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-12 pl-10 w-full"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <Label className="text-xs text-gray-400">
                          Portfolio / GitHub Link
                        </Label>

                        <div className="relative mt-1">
                          <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                          <Input
                            required={true}
                            name="gitubLink"
                            type="url"
                            placeholder="https://github.com/..."
                            variant="secondary"
                            className=" bg-[#8dd0f2]/5  focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-14 pl-10 w-full"
                          />
                        </div>
                      </div>
                      <TextField
                        isRequired
                        name="bio"
                        validate={(value) => {
                          if (value.length < 10) {
                            return "Bio must be at least 10 characters";
                          }
                          return null;
                        }}
                      >
                        <label>Motivation Message </label>
                        <TextArea
                          aria-label="Quick project update"
                          name="motivation"
                          required
                          className="h-32 w-full rounded-xl border border-[#224764] bg-[#8dd0f2]/5 focus:bg-transparent focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 p-3 text-sm text-white placeholder:text-gray-400"
                          placeholder="Why are you a great fit for this role?"
                        />
                        <Description>Minimum 10 characters</Description>
                        <FieldError />
                      </TextField>
                    </FieldGroup>
                    <Fieldset.Actions>
                      <Button
                        type="submit"
                        className="button button--md button--primary round  bg-linear-to-r  from-[#173b52] via-[#1e4360] to-[#21435a] text-[#c4e1f0]  rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                      >
                        <PaperPlane />
                        Submit Application{" "}
                      </Button>
                      <Button
                        slot={"close"}
                        type="reset"
                        onPress={() => setIsOpen(false)}
                        variant="secondary"
                        className="w-full rounded-lg bg-[#8dd0f2]/5 text-[#8dd0f2] border border-gray-700"
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
