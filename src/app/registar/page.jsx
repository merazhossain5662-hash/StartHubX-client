"use client";

import React, { useState } from "react";
import { Button, Form, Input, Label } from "@heroui/react";
import logoimage from "@/assets/logo.png";
import {
  Person as User,
  Envelope,
  Lock,
  Picture as ImageIcon,
  Eye,
  EyeSlash,
} from "@gravity-ui/icons";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  const [role, setRole] = useState("Collaborator");
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // 🔥 IMAGE UPLOAD TO IMGBB
  const [imageError, setImageError] = useState("");

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
    const finalPassword =
      formData.get("password") === formData.get("confirmPassword");
    if (!finalPassword) {
      alert("Passwords do not match.");
      return;
    }
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.role = role;
    data.profileImage = imageUrl;
    data.password = formData.get("password");

    const { data: signUpData, error } = await authClient.signUp.email({
      name: data.name, // required
      email: data.email, // required
      password: data.password, // required
      image: data.profileImage,
      role: data.role,
      callbackURL: "/login",
    });

    if (error) {
      alert(error.message || "An error occurred during sign-up.");
      return;
    }
    if (signUpData) {
      alert("Account Created 🚀");
      redirect("/login");
    }

    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center bg-transparent justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-800 shadow-md shadow-[#022b3f]/70 bg-transparent p-7 backdrop-grayscale-25 hover:backdrop-brightness-110 ">
        {/* LOGO */}
        <div className="flex items-center justify-center gap-1 mb-6">
          <Image
            src={logoimage}
            height={35}
            width={35}
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <p className="font-bold text-[#c4e1f0] text-2xl">
            Start<span className="text-[#6998AB]">Hub</span>
            <span className="text-[#406882]">X</span>
          </p>
        </div>

        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            Create your account
          </h2>
        </div>

        <Form onSubmit={onSubmit} className="space-y-5">
          {/* GOOGLE BTN */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm text-gray-200"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-4"
            />
            Continue with Google
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex-1 h-px bg-white/10" />
            or
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* ROLE */}
          <div>
            <Label className="text-xs text-gray-400 mb-2 block">
              I am a...
            </Label>

            <div className="flex gap-2">
              {["Founder", "Collaborator"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`w-full py-2 rounded-xl border text-sm transition ${
                    role === r
                      ? "bg-[#012639] border-[#8dd0f2]/70 text-white p-4 py-4 shadow-md transition "
                      : "border-white/10 text-gray-400 hover:bg-white/2 py-4 hover:border-[#224764]/70 hover:text-white transition duration-400"
                  }`}
                >
                  {r === "Founder" ? "Founder" : "Collaborator"}
                </button>
              ))}
            </div>
          </div>

          {/* NAME */}
          <div className="flex flex-col">
            <Label className="text-xs text-gray-400">Full Name</Label>

            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <Input
                required
                name="name"
                placeholder="John Doe"
                variant="secondary"
                className=" bg-gray-900 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-12 pl-10 w-full"
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
                name="email"
                type="email"
                placeholder="you@example.com"
                variant="secondary"
                className=" bg-gray-900 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-12 pl-10 w-full"
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
                <div className="flex items-center gap-2 text-sm text-[#8dd0f2]">
                  {loading ? "Uploading..." : "Upload Profile Image"}
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
          <div>
            <Label className="text-xs text-gray-400">Password</Label>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <Input
                name="password"
                type={showPass ? "text" : "password"}
                variant="secondary"
                className=" bg-gray-900 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-12 pl-10 w-full"
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2e5a7c] hover:text-[#8dd0f2] transition"
              >
                {showPass ? <EyeSlash /> : <Eye />}
              </button>
            </div>
          </div>

          {/* CONFIRM */}
          <div>
            <Label className="text-xs text-gray-400">Confirm Password</Label>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <Input
                name="confirmPassword"
                type={showPass ? "text" : "password"}
                variant="secondary"
                className=" bg-gray-900 focus:bg-transparent border border-[#224764] focus:border-[#8dd0f2]/70 focus:ring-1 focus:ring-[#8dd0f2]/70 h-12 pl-10 w-full"
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2e5a7c] hover:text-[#8dd0f2] transition"
              >
                {showPass ? <EyeSlash /> : <Eye />}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full rounded-xl py-2.5 text-sm font-medium bg-linear-to-r from-[#2a587b] via-[#437fac] to-[#6bc8f6] hover:opacity-90 transition"
          >
            Create Account
          </Button>

          {/* FOOTER */}
          <p className="text-center text-xs text-gray-400">
            Already have an account?{" "}
            <span className="text-[#8dd0f2] hover:underline cursor-pointer">
              Sign in
            </span>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
