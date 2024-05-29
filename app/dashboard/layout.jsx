import React from "react";
import dynamic from "next/dynamic";
import { SignedIn } from "@clerk/nextjs";
const Sidebar = dynamic(() => import("./_components/Sidebar"));

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="md:w-72 fixed">
        <Sidebar />
      </div>
      <div className="md:ml-72">
        <SignedIn>{children}</SignedIn>
      </div>
    </div>
  );
};

export default DashboardLayout;
