"use client";
import { useState } from "react";
import {
  ArrowRightFromSquare,
  Circles4Square,
  Person,
  TextAlignJustify,
} from "@gravity-ui/icons";
import {
  Link,
  Button,
  Separator,
  Popover,
  Spinner,
  Avatar,
  SeparatorRoot,
} from "@heroui/react";
import logo from "../assets/logo.png";
import Image from "next/image";
import Navlink from "@/components/Navlink";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  console.log(session);

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
          {isPending ? (
            <div className="flex items-center gap-4">
              <Spinner size="lg" className="text-[#8dd0f2]" />
            </div>
          ) : session ? (
            <>
              <Popover className="border border-separator bg-background shadow-lg">
                <Popover.Trigger className="flex items-center gap-2 cursor-pointer bg-transparent border border-gray-800 backdrop-brightness-150 transition rounded-lg px-3 py-1.5">
                  <Avatar className="h-7 w-7 ">
                    <Avatar.Image alt="John Doe" src={session.user?.image} />
                    <Avatar.Fallback className="bg-[#204561]">
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                  <h1 className="text-[#c4e1f0] text-sm font-semibold">
                    {session.user?.name?.slice(
                      0,
                      session.user?.name?.indexOf(" "),
                    )}
                  </h1>
                  <span className="text-[#c4e1f0] hover:text-[#6998AB] text-xs ">
                    <TextAlignJustify className="text-[#c4e1f0] hover:text-[#6998AB] font-extralight" />
                  </span>
                </Popover.Trigger>
                <Popover.Content className="max-w-64 bg-transparent border backdrop-blur-lg">
                  <Popover.Dialog className="w-full">
                    <Popover.Arrow />
                    <Popover.Heading>
                      <p className="text-gray-500 text-xs font-light">
                        Signed in as
                      </p>
                      <span className="text-[#c4e1f0] font-bold">
                        {session.user?.role}
                      </span>
                    </Popover.Heading>
                    <SeparatorRoot className="my-2" />

                    <ul className="flex flex-col gap-2 w-50">
                      <Link
                        href="/dashboard"
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/15 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 py-2 px-1"
                      >
                        <Circles4Square className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-5 h-5 mr-2 inline-block" />
                        <li className="">Dashboard</li>
                      </Link>
                      <Link
                        href="/dashboard"
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/15 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 py-2 px-1"
                      >
                        <Person className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-5 h-5 mr-2 inline-block" />
                        <li className="">Profile</li>
                      </Link>
                      <button
                        onClick={() => authClient.signOut()}
                        className="flex text-red-600/70 hover:text-red-600 w-full hover:bg-red-600/10 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 py-2 px-1"
                      >
                        <ArrowRightFromSquare className="text-red-600/70 hover:text-red-600 w-5 h-5 mr-2 inline-block" />
                        <li className="">Logout</li>
                      </button>
                    </ul>
                  </Popover.Dialog>
                </Popover.Content>
              </Popover>
            </>
          ) : (
            <>
              {" "}
              <Link
                href="/login"
                className="text-[#c4e1f0] hover:text-[#6998AB]"
              >
                Login
              </Link>
              <Link href="/registar">
                <Button className="bg-[#173b52] hover:bg-[#1e4360] text-[#c4e1f0]">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-4 md:hidden">
          {isPending ? (
            <div className="flex items-center gap-4">
              <Spinner size="lg" className="text-[#8dd0f2]" />
            </div>
          ) : session ? (
            <>
              <Popover className="border border-separator bg-background shadow-lg">
                <Popover.Trigger className="flex items-center gap-2 cursor-pointer bg-transparent border border-gray-800 backdrop-brightness-150 transition rounded-lg px-1 rounded-ful py-1">
                  <Avatar className="h-8 w-8 ">
                    <Avatar.Image alt="John Doe" src={session.user.image} />
                    <Avatar.Fallback className="bg-[#204561]">
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                </Popover.Trigger>
                <Popover.Content className="max-w-64 bg-transparent border backdrop-blur-lg">
                  <Popover.Dialog className="w-full">
                    <Popover.Arrow />

                    <ul className="flex flex-col gap-2 max-w-50">
                      <Link
                        href="/dashboard"
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/15 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 py-2 px-1"
                      >
                        <Circles4Square className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-5 h-5 mr-2 inline-block" />
                        <li className="">Dashboard</li>
                      </Link>
                      <Link
                        href="/dashboard"
                        className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/15 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 py-2 px-1"
                      >
                        <Person className="text-[#c4e1f0]/70 hover:text-[#6998AB] w-5 h-5 mr-2 inline-block" />
                        <li className="">Profile</li>
                      </Link>
                      <button
                        onClick={() => authClient.signOut()}
                        className="flex text-red-600/70 hover:text-red-600 w-full hover:bg-red-600/10 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 py-2 px-1"
                      >
                        <ArrowRightFromSquare className="text-red-600/70 hover:text-red-600 w-5 h-5 mr-2 inline-block" />
                        <li className="">Logout</li>
                      </button>
                    </ul>
                  </Popover.Dialog>
                </Popover.Content>
              </Popover>
            </>
          ) : (
            <></>
          )}
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator bg-transparent backdrop-blur-2xl md:hidden">
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
            {!session && (
              <>
                <Separator></Separator>

                <li className="mx-auto">
                  <Link
                    href="/login"
                    className="text-[#c4e1f0] hover:text-[#6998AB]"
                  >
                    Login
                  </Link>
                </li>
                <li className="w-full">
                  <Link href="/registar" className="w-full">
                    <Button className="bg-[#173b52] w-full hover:bg-[#1e4360] text-[#c4e1f0]">
                      Sign Up
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
