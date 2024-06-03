"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { SignedIn } from "@clerk/nextjs";
import { Menu } from "lucide-react"; // Import the Menu icon from lucide-react

const DynamicSidebar = dynamic(() => import("./_components/Sidebar"), {
  ssr: false
});

const DashboardLayout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <div className="md:hidden">
        <Menu
          className="text-gray-500 ml-auto mr-3 cursor-pointer"
          onClick={toggleDrawer}
          size={32}
        />
        {isDrawerOpen && <DynamicSidebar onClose={toggleDrawer} />}
      </div>
      <div className="hidden md:block md:w-72 fixed">
        <DynamicSidebar />
      </div>
      <div className="md:ml-72">
        <SignedIn>{children}</SignedIn>
      </div>
    </div>
  );
};

export default DashboardLayout;
