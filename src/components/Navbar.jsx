"use client";
import { useState } from "react";
import { Link, Button } from "@heroui/react";
import logo from "../assets/logo.png";
import Image from "next/image";
import Navlink from "@/components/Navlink";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full shadow-2xl bg-transparent border-b border-b-[#012035] backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <Link href="/">
            <div className="flex items-center ">
              <Image
                src={logo}
                height={35}
                width={35}
                alt="Logo"
                className="h-10 w-10 rounded-full object-cover"
              />
              <p className="font-bold text-[#c4e1f0] text-xl">
                Start<span className="text-[#6998AB]">Hub</span>
                <span className="text-[#406882]">X</span>
              </p>
            </div>
          </Link>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          <li>
            <Navlink
              className={
                "transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1"
              }
              href="/"
            >
              Home
            </Navlink>
          </li>
          <li>
            <Navlink
              className={
                "transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1"
              }
              href="/Startups"
            >
              Startups
            </Navlink>
          </li>
          <li>
            <Navlink
              className={
                "transition-transform  duration-300 ease-in-out hover:scale-105 hover:-translate-y-1"
              }
              href="/Opportunities"
            >
              Opportunities
            </Navlink>
          </li>
        </ul>
        <div className="hidden items-center gap-4 md:flex">
          <Link href="#" className="text-[#c4e1f0] hover:text-[#6998AB]">
            Login
          </Link>
          <Button className="bg-[#173b52] hover:bg-[#1e4360] text-[#c4e1f0]">
            Sign Up
          </Button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Navlink
                className={
                  "transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1"
                }
                href="/"
              >
                Home
              </Navlink>
            </li>
            <li>
              <Navlink
                className={
                  "transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1"
                }
                href="/Startups"
              >
                Startups
              </Navlink>
            </li>
            <li>
              <Navlink
                className={
                  "transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1"
                }
                href="/Opportunities"
              >
                Opportunities
              </Navlink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
