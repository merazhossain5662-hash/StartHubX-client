"use client";
import React, { useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Form,
  Label,
  Input,
  Chip,
  TextArea,
} from "@heroui/react";
import {
  Person as User,
  Envelope,
  Picture as ImageIcon,
  FloppyDisk,
  Tag,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const isPremium =
    session?.user?.plan === "premium" || session?.user?.isPremium;

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (imageError) {
      alert("Fix image errors before submitting.");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      await authClient.updateUser({
        image: imageUrl || session?.user?.image,
        name: data.name,
      });

      router.refresh();
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen py-7">
      <div className="w-10/12 mx-auto">
        <h1 className="text-center text-2xl font-bold">My Profile</h1>
        <p className="text-center text-sm text-gray-400 mt-1">
          Update your personal information and skills.
        </p>
        <section className="flex md:flex-row flex-col md:items-baseline justify-center gap-5 mt-6">
          <Card className="md:w-80 text-center w-full gap-2 rounded-3xl border border-gray-800 shadow-md shadow-[#022b3f]/70 bg-transparent p-7 backdrop-grayscale-25 hover:backdrop-brightness-110">
            <Avatar
              size="lg"
              className="h-22 w-22 mx-auto object-cover rounded-full"
            >
              <Avatar.Image
                alt={session?.user?.name || "User"}
                src={session?.user?.image}
              />
              <Avatar.Fallback className="bg-[#204561]">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </Avatar.Fallback>
            </Avatar>
            <Card.Header>
              <Card.Title>{session?.user?.name}</Card.Title>
            </Card.Header>
            <Card.Footer className="flex flex-wrap justify-center gap-2 mt-2">
              {/* GOLDEN CHIP FOR PREMIUM USERS */}
              {isPremium && (
                <Chip
                  size="sm"
                  variant="soft"
                  className="border border-amber-400/60 text-amber-300 bg-amber-500/15 font-medium shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                >
                  ★ Premium
                </Chip>
              )}

              {/* USER ROLE CHIP */}
              {session?.user?.role && (
                <Chip
                  size="sm"
                  variant="soft"
                  className="border border-slate-500 text-slate-400 bg-slate-500/10 font-extralight"
                >
                  {session?.user?.role}
                </Chip>
              )}
            </Card.Footer>
          </Card>

          <div className="w-full max-w-md rounded-3xl border border-gray-800 shadow-md shadow-[#022b3f]/70 bg-transparent p-7 backdrop-grayscale-25 hover:backdrop-brightness-110">
            <Form onSubmit={onSubmit} className="space-y-5">
              {/* NAME */}
              <div className="flex flex-col">
                <Label className="text-xs text-gray-400">Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    required
                    defaultValue={session?.user?.name || ""}
                    name="name"
                    placeholder="John Doe"
                    variant="secondary"
                    className="bg-gray-900 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-12 pl-10 w-full text-white"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex flex-col">
                <Label className="text-xs text-gray-400">Email</Label>
                <div className="relative mt-1">
                  <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    required
                    readOnly
                    name="email"
                    type="email"
                    defaultValue={session?.user?.email || ""}
                    variant="secondary"
                    className="text-gray-500 bg-gray-900/50 border border-[#224764] h-12 pl-10 w-full cursor-not-allowed"
                  />
                </div>
              </div>

              {/* IMAGE */}
              <div>
                <Label className="text-xs text-gray-400">
                  Profile Image (optional)
                </Label>
                <div className="flex gap-2 mt-1">
                  <div className="border flex justify-center items-center rounded-full w-12 h-12 overflow-hidden border-[#224764] transition shrink-0">
                    {preview || session?.user?.image ? (
                      <img
                        src={preview || session?.user?.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl text-gray-400">
                        <ImageIcon />
                      </span>
                    )}
                  </div>
                  <label className="w-full flex items-center justify-between gap-3 border border-[#83d5fe]/70 rounded-xl px-4 py-2 cursor-pointer hover:bg-indigo-500/10 transition">
                    <span className="text-sm text-[#8dd0f2]">
                      {loading ? "Uploading..." : "Upload Profile Image"}
                    </span>
                    <input
                      type="file"
                      disabled={loading || saving}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              {imageError && (
                <p className="text-xs text-red-400 mt-1">{imageError}</p>
              )}

              {/* SKILLS */}
              <div className="flex flex-col">
                <Label className="text-xs text-gray-400">Skills</Label>
                <div className="relative mt-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    name="skills"
                    type="text"
                    placeholder="React, TypeScript, Design..."
                    variant="secondary"
                    className="bg-gray-900 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-12 pl-10 w-full text-white"
                  />
                </div>
              </div>

              {/* BIO */}
              <div className="flex flex-col gap-1">
                <Label className="text-xs text-gray-400">Bio</Label>
                <TextArea
                  aria-label="Quick project update"
                  name="bio"
                  className="h-32 w-full rounded-xl border border-[#224764] bg-gray-900 focus:bg-transparent focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 p-3 text-sm text-white placeholder:text-gray-400"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* SUBMIT */}
              <Button
                isDisabled={saving || loading}
                type="submit"
                className="w-full rounded-xl py-2.5 text-sm font-medium bg-gradient-to-r from-[#2a587b] via-[#437fac] to-[#6bc8f6] hover:opacity-90 transition disabled:opacity-50"
              >
                <FloppyDisk />
                {saving ? "Saving..." : "Save Profile"}
              </Button>
            </Form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
