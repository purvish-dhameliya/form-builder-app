import React from "react";
import Sidebar from "./_components/Sidebar";
import { SignedIn } from "@clerk/nextjs";

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
