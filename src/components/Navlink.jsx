import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
const Navlink = ({ href, children, className }) => {
  const pathname = usePathname();
  return (
    <div>
      <Link
        href={href}
        className={`inline-block ${className} ${pathname === href ? "text-[#9cddf7] border-b-2 border-b-[#6998AB]" : "text-gray-500"}`}
      >
        {children}
      </Link>
    </div>
  );
};

export default Navlink;
