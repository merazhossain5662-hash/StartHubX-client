import { DashboardSidebar } from "@/components/Dashboardsidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex gap-2 min-h-screen">
      <DashboardSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
