"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Sidebar = () => {
  const path = usePathname();
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard"
    },
    {
      id: 2,
      name: "Analytics",
      icon: LineChart,
      path: "/dashboard/analytics"
    },
    {
      id: 3,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses"
    },
    {
      id: 1,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade"
    }
  ];

  return (
    <div className="h-screen shadow-md border">
      <div className="p-5">
        {menuList.map((menu, index) => (
          <h2
            key={index}
            className={`flex items-center gap-3 p-4 hover:bg-primary hover:text-white rounded-lg mb-3 cursor-pointer text-gray-500 
            ${path === menu.path && "bg-primary text-white"}`}
          >
            <menu.icon />
            {menu.name}
          </h2>
        ))}
      </div>
      <div className="fixed bottom-20 p-6 w-64">
        <Button className="w-full">+ Create Form</Button>
        <div className="my-7">
          <Progress value={33} />
          <h2 className="text-sm mt-2 text-gray-500">
            <strong>2</strong> Out of<strong> 3</strong> File Created
          </h2>
          <h2 className="text-sm mt-2 text-gray-600">
            upgrade your plan for unlimited AI form build.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
