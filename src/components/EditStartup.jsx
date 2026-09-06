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
import { authClient } from "@/lib/auth-client";

const EditStartup = ({ startupData }) => {
  const [preview, setPreview] = useState(null);

  // 1. Separate image upload loading state from form submit loading state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [imageError, setImageError] = useState("");
  const [imageUrl, setImageUrl] = useState(startupData?.profileImage || "");

  // 2. Track select dropdown values with state
  const [industry, setIndustry] = useState(startupData?.state || "");
  const [fundingStage, setFundingStage] = useState(
    startupData?.FundingStage || "",
  );

  const router = useRouter();

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageError("No file selected.");
      return;
    }

    setImageError("");

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setImageError("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setImageError("Image must be less than 2MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const formData = new FormData();
    formData.append("image", file);

    setUploadingImage(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error("ImgBB API key is missing in environment variables.");
      }

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data?.data?.url) {
        setImageUrl(data.data.url);
      } else {
        throw new Error(data?.error?.message || "Image upload failed");
      }
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      setImageError(err.message || "Upload failed. Try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleUpdate = async (e, close) => {
    e.preventDefault();

    if (imageError) {
      alert("Fix image errors before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const { data: jwt } = await authClient.token();
      const token = jwt?.token || jwt;
      const form = e.target;

      const payload = {
        FounderEmail: form.elements.namedItem("FounderEmail")?.value,
        name: form.elements.namedItem("name")?.value,
        state: industry || startupData?.state,
        FundingStage: fundingStage || startupData?.FundingStage,
        description: form.elements.namedItem("description")?.value,
        profileImage: imageUrl || startupData?.profileImage,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/startups/${startupData?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(responseData?.message || "Update failed");
      }

      alert("Startup updated successfully!");
      if (close) close();
      router.refresh();
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert(err.message || "Failed to update startup.");
    } finally {
      // Always reset submitting state regardless of success or error
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Modal>
        <Button className="text-[#c4e1f0]/70 rounded-md hover:text-[#6998AB] hover:bg-[#1e4360]/15 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 py-4 border border-[#2182cd] bg-[#1e4360]/50 px-3">
          <Pencil />
          Edit
        </Button>
        <Modal.Backdrop>
          <Modal.Container>
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
                                {uploadingImage
                                  ? "Uploading..."
                                  : "Upload Logo"}
                              </span>
                            </div>

                            <input
                              type="file"
                              disabled={uploadingImage || submitting}
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
                          defaultSelectedKeys={[
                            startupData?.state || "Technology",
                          ]}
                          placeholder="Select Industry"
                          name="state"
                          onSelectionChange={(keys) =>
                            setIndustry(Array.from(keys)[0])
                          }
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
                          defaultSelectedKeys={[
                            startupData?.FundingStage || "Seed",
                          ]}
                          placeholder="Select Funding Stage"
                          name="FundingStage"
                          onSelectionChange={(keys) =>
                            setFundingStage(Array.from(keys)[0])
                          }
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
                        isDisabled={submitting || uploadingImage}
                        className="text-[#c4e1f0]/70 rounded-md hover:text-[#6998AB] hover:bg-[#1e4360]/15 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 py-4 border border-[#2182cd] bg-[#1e4360]/50 px-3 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Pencil />
                        {submitting ? "Updating..." : "Update Now"}
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
