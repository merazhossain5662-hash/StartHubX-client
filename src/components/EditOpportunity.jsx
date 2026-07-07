"use client";

import React, { useState } from "react";
import { Modal, Button, Input, Form } from "@heroui/react";
import { Select, ListBox } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Pencil } from "@gravity-ui/icons";

const EditOpportunityModal = ({ opportunity }) => {
  const [state, setState] = useState(opportunity.state);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setState(e.currentTarget.state);
    const datal = {};

    formData.forEach((value, key) => {
      datal[key] = value;
    });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/opportunity/${opportunity._id}`,
        {
          method: "PATCH", // or PATCH depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datal),
        },
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) throw new Error("Update failed");

      router.refresh();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <>
      {/* MODAL */}
      <Modal className="bg-transparent mx-auto ">
        <Button
          isIconOnly
          variant="flat"
          className="border border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/10"
        >
          <Pencil></Pencil>
        </Button>
        <Modal.Backdrop className="bg-black/80">
          <Modal.Container className="items-start pt-20">
            <Modal.Dialog className="bg-[#0b1120] border border-[#224764] rounded-2xl text-white w-full max-w-2xl mx-auto">
              <Modal.Header>
                <Modal.Heading>Edit Opportunity</Modal.Heading>
              </Modal.Header>

              <Modal.Body className="space-y-4">
                {/* TITLE */}
                <Form onSubmit={handleUpdate}>
                  <Input
                    name="Title"
                    defaultValue={opportunity.Title}
                    placeholder="Enter title"
                    className="bg-gray-900 border border-[#224764]"
                  />

                  {/* WORK TYPE SELECT */}
                  <Select
                    className="w-full "
                    defaultValue={state}
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
                  {/* COMMITMENT */}
                  <Select
                    className="w-full "
                    defaultValue={opportunity.CommitmentLevel}
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

                  {/* DATE */}
                  <Input
                    type="date"
                    name="date"
                    defaultValue={opportunity.date}
                    className="bg-gray-900 border border-[#224764]"
                  />
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
                <Button
                  slot="close"
                  className="bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default EditOpportunityModal;
