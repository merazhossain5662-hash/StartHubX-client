"use client";
import { useSession } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { Avatar, Chip, Separator } from "@heroui/react";
import {
  LayoutSideContent,
  FilePlus,
  ListUl,
  ChartColumnStacked,
  Rocket,
  SquareArticle,
  Rectangles4,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function DashboardSidebar() {
  const { data: session, isPending } = useSession();
  const [dynamicItems, setDynamicItems] = useState([]);
  const navItems = dynamicItems;
  const founderItems = [
    {
      icon: ChartColumnStacked,
      label: "Overview",
      href: `/dashboard/${session?.user?.role.toLowerCase()}`,
    },
    {
      icon: Rocket,
      label: "My Startup",
      href: `/dashboard/${session?.user?.role.toLowerCase()}/mystartup`,
    },
    {
      icon: FilePlus,
      label: "Add Opportunity",
      href: `/dashboard/${session?.user?.role.toLowerCase()}/add-opportunity`,
    },
    {
      icon: ListUl,
      label: "Manage Opportunities",
      href: `/dashboard/${session?.user?.role.toLowerCase()}/manage-opportunities`,
    },
    {
      icon: SquareArticle,
      label: "Applications",
      href: `/dashboard/${session?.user?.role.toLowerCase()}/applications`,
    },
  ];
  const collaboretorItems = [
    {
      icon: ChartColumnStacked,
      label: "Overview",
      href: `/dashboard/${session?.user?.role.toLowerCase()}`,
    },
    {
      icon: ListUl,
      label: "My Applications",
      href: `/dashboard/${session?.user?.role.toLowerCase() || "collaboretor"}/my-applications`,
    },
    {
      icon: Rectangles4,
      label: "Browse Opportunities",
      href: "/Opportunities",
    },
  ];
  useEffect(() => {
    if (session?.user?.role.toLowerCase() === "founder") {
      setDynamicItems(founderItems);
    } else if (session?.user?.role.toLowerCase() === "collaborator") {
      setDynamicItems(collaboretorItems);
    }
  }, [session, founderItems, collaboretorItems, setDynamicItems]);
  const pathName = usePathname();
  console.log("pathName", pathName);
  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className={
            pathName === item.href
              ? "flex text-[#c4e1f0] border-l-4 border-[#6998AB] hover:text-[#6998AB] w-full bg-[#1e4360]/50 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5   "
              : "flex text-[#c4e1f0]/70 hover:text-[#6998AB] w-full hover:bg-[#1e4360]/25 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 items-center gap-3 rounded-xl px-3 py-2.5 text-sm  "
          }
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r p-4 border-[#224764]/40 lg:block bg-transparent backdrop-blur-xs">
        <div className="mb-6 flex items-center">
          <Avatar className="h-10 w-10 ">
            <Avatar.Image alt="John Doe" src={session?.user?.image} />
            <Avatar.Fallback className="bg-[#204561]">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar>
          <div className="ml-3 flex flex-col">
            <span className="font-bold ">{session?.user?.name}</span>
            <Chip className="mt-1" variant="secondary" color="accent" size="sm">
              {session?.user?.role}
            </Chip>
          </div>
        </div>
        <Separator className="my-2" />
        {navContent}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContent />
        </Button>
        <Drawer.Backdrop className="bg-transparent">
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-transparent backdrop-blur-md">
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
