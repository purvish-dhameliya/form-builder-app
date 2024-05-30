"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/config/gemini-api";
import { desc, eq } from "drizzle-orm";
import { db } from "@/config";
import { JsonForms } from "@/config/schema";
import MenuList from "/app/_data/MenuList";

const Sidebar = () => {
  const path = usePathname();
  const { user } = useUser();
  const [formList, setFormList] = useState([]);
  const [percentageFileCreated, setPercentageFileCreated] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

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

  const onCreateForm = async () => {
    setLoading(true);
    try {
      const result = await AiChatSession.sendMessage(
        "Description: " + userInput + PROMPT
      );
      const jsonResponse = result.response.text();

      if (jsonResponse) {
        const resp = await db
          .insert(JsonForms)
          .values({
            jsonform: jsonResponse,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD/MM/yyyy")
          })
          .returning({ id: JsonForms.id });

        if (resp[0].id) {
          router.push("/edit-style/" + resp[0].id);
        }
      }
    } catch (error) {
      console.error("Error creating form:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && getFormList();
  }, [user]);

  useEffect(() => {
    console.log(path.includes("responses") !== -1);
  }, [path]);

  return (
    <div className="h-screen border shadow-md">
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

      <div className="fixed w-64 p-6 bottom-20">
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
