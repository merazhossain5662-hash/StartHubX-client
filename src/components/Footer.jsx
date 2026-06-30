"use client";

import { LogoFacebook, LogoGithub, LogoLinkedin } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-gray-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center ">
            <Image
              src={logo}
              height={35}
              width={35}
              alt="Logo"
              className="h-8 w-8 rounded-full object-cover"
            />
            <p className="font-bold text-[#c4e1f0] text-lg">
              Start<span className="text-[#6998AB]">Hub</span>
              <span className="text-[#406882]">X</span>
            </p>
          </div>
          <p className="mt-3 text-sm text-gray-400 wrap-break-word">
            Build startups together. Connect with founders and talented
            collaborators.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/startups">Browse Startups</Link>
            </li>
            <li>
              <Link href="/opportunities">Opportunities</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-400">support@starthubx.com</p>
          <p className="text-sm text-gray-400 mt-1">Dhaka, Bangladesh</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">
              <LogoGithub size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <LogoFacebook size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <LogoLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} StartHubX. All rights reserved.
      </div>
    </footer>
  );
}
