"use client";
import {
  Rocket,
  Envelope,
  Picture as ImageIcon,
  Clock,
  CircleFill,
  Pencil,
} from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import {
  Form,
  Modal,
  Input,
  Label,
  Button,
  TextArea,
  Select,
  ListBox,
} from "@heroui/react";

const EditStartup = ({ startupData }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [imageUrl, setImageUrl] = useState(startupData?.profileImage || "");

  const router = useRouter();

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageError("No file selected.");
      return;
    }

    setImageError("");

    // ✅ TYPE VALIDATION
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setImageError("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }

    // ✅ SIZE VALIDATION (2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setImageError("Image must be less than 2MB.");
      return;
    }

    // ✅ PREVIEW
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // ✅ UPLOAD TO IMGBB
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      if (data?.data?.url) {
        setImageUrl(data.data.url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      setImageError("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e, close) => {
    e.preventDefault();
    if (imageError) {
      alert("Fix image errors before submitting.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const datal = {};

    formData.forEach((value, key) => {
      datal[key] = value;
    });

    datal.profileImage = imageUrl || startupData?.profileImage;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/startups/${startupData?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datal),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Update failed");

      if (close) close(); // Close HeroUI modal on success
      router.refresh();
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert(err.message);
    }
  };

  return (
    <div>
      <Modal>
        {/* Trigger Button inside Modal auto-wires opening */}
        <Button className="text-[#c4e1f0]/70 rounded-md hover:text-[#6998AB] hover:bg-[#1e4360]/15 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 py-4 border border-[#2182cd] bg-[#1e4360]/50 px-3">
          <Pencil />
          Edit
        </Button>
        <Modal.Backdrop>
          <Modal.Container>
            {/* HeroUI render function provides `close` helper */}
            <Modal.Dialog className="sm:max-w-[360px]">
              {({ close }) => (
                <>
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Icon className="bg-default text-foreground">
                      <Pencil />
                    </Modal.Icon>
                    <Modal.Heading>Update Startup</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <Form
                      onSubmit={(e) => handleUpdate(e, close)}
                      className="space-y-5"
                    >
                      {/* FOUNDER EMAIL */}
                      <div className="flex flex-col">
                        <Label className="text-xs text-gray-400">
                          Founder Email
                        </Label>
                        <div className="relative mt-1">
                          <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input
                            required
                            readOnly
                            name="FounderEmail"
                            type="email"
                            defaultValue={startupData?.FounderEmail || ""}
                            variant="secondary"
                            className="bg-gray-900 text-gray-600 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-14 pl-10 w-full"
                          />
                        </div>
                      </div>

                      {/* STARTUP NAME */}
                      <div className="flex flex-col">
                        <Label className="text-xs text-gray-400">
                          Startup Name
                        </Label>
                        <div className="relative mt-1">
                          <Rocket className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <Input
                            required
                            name="name"
                            defaultValue={startupData?.name || ""}
                            placeholder="e.g. TechNova"
                            variant="secondary"
                            className="bg-gray-900 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-14 pl-10 w-full"
                          />
                        </div>
                      </div>

                      {/* IMAGE UPLOAD */}
                      <div>
                        <Label className="text-xs text-gray-400">
                          Profile Image (optional)
                        </Label>
                        <div className="flex gap-1">
                          <div className="border flex justify-center items-center rounded-full w-14 h-12 cursor-pointer border-[#224764] transition overflow-hidden">
                            {preview || startupData?.profileImage ? (
                              <img
                                src={preview || startupData?.profileImage}
                                alt="Preview"
                                className="w-14 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-center py-4 text-xl">
                                <ImageIcon />
                              </span>
                            )}
                          </div>
                          <label className="mt-1 w-full flex items-center justify-between gap-3 border border-[#83d5fe]/70 rounded-xl px-4 py-2 cursor-pointer hover:bg-indigo-500/10 transition">
                            <div className="flex items-center gap-2 w-full text-sm text-[#8dd10f2]">
                              <span className="text-center w-full">
                                {loading ? "Uploading..." : "Upload Logo"}
                              </span>
                            </div>

                            <input
                              type="file"
                              disabled={loading}
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      {imageError && (
                        <p className="text-xs text-red-400 mt-1">
                          {imageError}
                        </p>
                      )}

                      {/* INDUSTRY & FUNDING STAGE */}
                      <div className="flex md:flex-row flex-col gap-3">
                        {/* Industry */}
                        <Select
                          className="w-full"
                          isRequired
                          defaultValue={startupData?.state}
                          placeholder="Select Industry"
                          name="state"
                        >
                          <label className="text-xs text-gray-400">
                            Industry
                          </label>
                          <Select.Trigger className="h-11 w-full rounded-xl border border-[#224764] bg-gray-900 focus:bg-transparent focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 px-4 text-sm text-white placeholder:text-gray-400">
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover className="bg-transparent backdrop-blur-sm border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 rounded-2xl">
                            <ListBox className="bg-transparent">
                              {[
                                "Technology",
                                "HealthTech",
                                "FinTech",
                                "EdTech",
                                "E-commerce",
                                "SaaS",
                                "Other",
                              ].map((item) => (
                                <ListBox.Item
                                  key={item}
                                  id={item}
                                  textValue={item}
                                  className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
                                >
                                  {item}
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>
                        </Select>

                        {/* Funding Stage */}
                        <Select
                          className="w-full"
                          isRequired
                          defaultValue={startupData?.FundingStage}
                          placeholder="Select Funding Stage"
                          name="FundingStage"
                        >
                          <label className="text-xs text-gray-400">
                            Funding Stage
                          </label>
                          <Select.Trigger className="w-full h-11 rounded-xl border border-[#224764] bg-gray-900 focus:bg-transparent focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 px-4 text-sm text-white placeholder:text-gray-400">
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover className="bg-transparent backdrop-blur-sm border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 rounded-2xl">
                            <ListBox className="bg-transparent">
                              {[
                                "Idea",
                                "Pre-Seed",
                                "Seed",
                                "Series-A",
                                "Series-B",
                                "Growth",
                              ].map((stage) => (
                                <ListBox.Item
                                  key={stage}
                                  id={stage}
                                  textValue={stage}
                                  className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
                                >
                                  {stage}
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>

                      {/* DESCRIPTION */}
                      <TextArea
                        aria-label="Quick project update"
                        name="description"
                        defaultValue={startupData?.description || ""}
                        required
                        className="h-32 w-full rounded-xl border border-[#224764] bg-gray-900 focus:bg-transparent focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 p-3 text-sm text-white placeholder:text-gray-400"
                        placeholder="Describe your startup, mission, and what you're building..."
                      />

                      {/* SUBMIT BUTTON */}
                      <Button
                        type="submit"
                        disabled={loading}
                        className="text-[#c4e1f0]/70 rounded-md hover:text-[#6998AB] hover:bg-[#1e4360]/15 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 py-4 border border-[#2182cd] bg-[#1e4360]/50 px-3 w-full"
                      >
                        <Pencil />
                        Update Now
                      </Button>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer />
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EditStartup;
