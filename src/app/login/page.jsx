"use client";
import { Envelope, Eye, EyeSlash, Lock } from "@gravity-ui/icons";
import React, { useState } from "react";
import { Button, Form, Input, Label } from "@heroui/react";
import logoimage from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const { data: signInData, error } = await authClient.signIn.email({
      email: data.email, // required
      password: data.password, // required
      rememberMe: true,
      callbackURL: "/",
    });

    if (error) {
      alert(error.message || "An error occurred during sign-in.");
      return;
    }
    if (signInData) {
      alert("Signed in successfully 🚀");
      redirect("/");
    }

    console.log(data);
  };

  return (
    <div>
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
            <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
            <p className="text-xs text-gray-400">Sign in to your account</p>
          </div>

          <Form onSubmit={onSubmit} className="space-y-5">
            {/* GOOGLE BTN */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm text-gray-200"
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

            {/* PASSWORD */}
            <div>
              <Label className="text-xs text-gray-400">Password</Label>

              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <Input
                  name="password"
                  type={showPass ? "text" : "password"}
                  variant="secondary"
                  placeholder="............"
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
              className="w-full rounded-xl py-5 text-sm font-medium bg-linear-to-r from-[#2a587b] via-[#437fac] to-[#6bc8f6] hover:opacity-90 transition"
            >
              Sign In
            </Button>

            {/* FOOTER */}
            <p className="text-center text-xs text-gray-400">
              Don't have an account?{" "}
              <Link href="/registar" className="text-[#8dd0f2] hover:underline">
                Sign up
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
