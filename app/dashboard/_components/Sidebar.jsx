import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Progress } from "@/components/ui/progress";
import { desc, eq } from "drizzle-orm";
import { db } from "@/config";
import { JsonForms } from "@/config/schema";
import MenuList from "/app/_data/MenuList";

const Sidebar = ({ onClose, className }) => {
  const path = usePathname();
  const { user } = useUser();
  const [formList, setFormList] = useState([]);
  const [percentageFileCreated, setPercentageFileCreated] = useState(0);

  const getFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms?.id));
    setFormList(result);

    const percentage = (result?.length / 3) * 100;
    setPercentageFileCreated(percentage);
  };

  useEffect(() => {
    user && getFormList();
  }, [user]);

  useEffect(() => {
    console.log(path.includes("responses") !== -1);
  }, [path]);

  return (
    <div className={`md:block sm:h-screen border shadow-md ${className}`}>
      <div className="p-5">
        {MenuList?.map((menu, index) => (
          <Link
            href={menu?.path}
            key={index}
            className={`flex items-center gap-3 p-4 hover:bg-primary hover:text-white rounded-lg mb-3 cursor-pointer text-gray-500 
            ${path === menu?.path && "bg-primary text-white"}`}
          >
            <menu.icon />
            {menu?.name}
          </Link>
        ))}
      </div>

      <div className="fixed w-64 p-6 bottom-20 hidden md:block">
        <div className="items-center my-10 ">
          <Progress value={percentageFileCreated} />
          <h2 className="mt-2 text-sm text-gray-500">
            <strong>{formList?.length}</strong> Out of
            <strong> {formList?.length}</strong> File Created
          </h2>
          <h2 className="mt-2 text-sm text-gray-600">
            upgrade your plan for unlimited AI form build.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
