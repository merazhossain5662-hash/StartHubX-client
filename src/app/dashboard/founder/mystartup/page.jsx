"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Label,
  Button,
  TextArea,
  Select,
  ListBox,
} from "@heroui/react";
import { Rocket, Envelope, Picture as ImageIcon } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

const Mystartuppage = () => {
  const { data: session, isPending } = authClient.useSession();
  const [imageError, setImageError] = useState("");
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      setImageUrl(data.data.url);
    } catch (err) {
      setImageError("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (imageError) {
      alert("Fix image errors before submitting.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    console.log("Form Data Entries:", Array.from(formData.entries()));
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.profileImage = imageUrl;

    console.log("Form Data:", data);
  };
  return (
    <div>
      <h1 className="text-lg md:text-2xl ">My Startup</h1>
      <p className="text-xs md:text-sm text-gray-500">
        Create and manage your startup profile.
      </p>
      <div>
        {/* Add your startup profile content here */}
        <div className="w-full max-w-2xl rounded-3xl border border-gray-800 shadow-md shadow-[#022b3f]/70 bg-transparent p-7 backdrop-grayscale-25 hover:backdrop-brightness-110 ">
          {/* HEADER */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-white">
              Create your account
            </h2>
          </div>

          <Form onSubmit={onSubmit} className="space-y-5">
            <div className="flex flex-col">
              <Label className="text-xs text-gray-400">Founder Email</Label>

              <div className="relative mt-1">
                <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <Input
                  required
                  readOnly
                  name="FounderEmail"
                  type="email"
                  defaultValue={session?.user?.email}
                  variant="secondary"
                  className=" bg-gray-900 text-gray-600 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-14 pl-10 w-full"
                />
              </div>
            </div>

            {/* NAME */}
            <div className="flex flex-col">
              <Label className="text-xs text-gray-400">Startup Name</Label>

              <div className="relative mt-1">
                <Rocket className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <Input
                  required
                  name="name"
                  placeholder="e.g. TechNova"
                  variant="secondary"
                  className=" bg-gray-900 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-14 pl-10 w-full"
                />
              </div>
            </div>

            {/* IMAGE */}
            <div>
              <Label className="text-xs text-gray-400">
                Profile Image (optional)
              </Label>
              <div className="flex gap-1">
                <div className="border flex justify-center rounded-full w-14 h-12 cursor-pointer border-[#224764] transition">
                  {preview ? (
                    <img
                      src={preview}
                      className="w-14 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-center py-4 text-xl">
                      <ImageIcon />
                    </span>
                  )}
                </div>
                <label className="mt-1 w-full flex items-center justify-between gap-3 border border-[#83d5fe]/70 rounded-xl px-4 py-2 cursor-pointer hover:bg-indigo-500/10 transition">
                  <div className="flex items-center gap-2 w-full text-sm   text-[#8ddl0f2]">
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
              <p className="text-xs text-red-400 mt-1">{imageError}</p>
            )}

            {/* PASSWORD */}
            <div className="flex md:flex-row flex-col gap-3">
              <Select
                className="w-full "
                isRequired
                placeholder="Select Industry "
                name="state"
              >
                <label className="text-xs text-gray-400">Industry</label>
                <Select.Trigger className="h-11 w-full rounded-xl border border-[#224764] bg-gray-900 focus:bg-transparent focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70  px-4 text-sm text-white placeholder:text-gray-400">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-transparent backdrop-blur-sm border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 rounded-2xl">
                  <ListBox className="bg-transparent ">
                    <ListBox.Item
                      className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                      id="Technology"
                      textValue="Technology"
                    >
                      Technology
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                      id="HealthTech"
                      textValue="HealthTech"
                    >
                      HealthTech
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                      id="FinTech"
                      textValue="FinTech"
                    >
                      FinTech
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                      id="EdTech"
                      textValue="EdTech"
                    >
                      EdTech
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                      id="E-commerce"
                      textValue="E-commerce"
                    >
                      E-commerce
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                      id="SaaS"
                      textValue="SaaS"
                    >
                      SaaS
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                      id="Other"
                      textValue="Other"
                    >
                      Other
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
              {/*Funding Stage */}
              <Select
                className="w-full "
                isRequired
                placeholder="Select Funding Stage"
                name="FundingStage"
              >
                <label className="text-xs text-gray-400">Funding Stage</label>
                <Select.Trigger className="w-full h-11 rounded-xl border border-[#224764] bg-gray-900 focus:bg-transparent focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70  px-4 text-sm text-white placeholder:text-gray-400">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-transparent backdrop-blur-sm border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 rounded-2xl">
                  <ListBox className="bg-transparent ">
                    <ListBox.Item
                      className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                      id=" Idea"
                      textValue="Idea"
                    >
                      Idea
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                      id="Pre-Seed"
                      textValue="Pre-Seed"
                    >
                      Pre-Seed
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                      id="Seed"
                      textValue="Seed"
                    >
                      Seed
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                      id="Series-A"
                      textValue="Series A"
                    >
                      Series A
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                      id="Series-B"
                      textValue="Series B"
                    >
                      Series B
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/40 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
                      id="Growth"
                      textValue="Growth"
                    >
                      Growth
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
            {/* CONFIRM */}
            <TextArea
              aria-label="Quick project update"
              name="description"
              required
              className="h-32 w-full rounded-xl border border-[#224764] bg-gray-900 focus:bg-transparent focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 p-3 text-sm text-white placeholder:text-gray-400"
              placeholder="Describe your startup, mission, and what you're building..."
            />

            {/* SUBMIT */}
            <Button
              type="submit"
              className="w-full rounded-xl py-5 text-sm font-medium bg-linear-to-r from-[#2a587b] via-[#437fac] to-[#6bc8f6] hover:opacity-90 transition"
            >
              Create Account
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Mystartuppage;
