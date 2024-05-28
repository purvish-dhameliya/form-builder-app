"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { db } from "@/config";
import { JsonForms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/config/gemini-api";
import MenuList from "@/app/_data/MenuList";

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
        console.log("resp :>> ", resp);
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
    <div className="h-screen shadow-md border">
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
      <div className="fixed bottom-20 p-6 w-64">
        <Button className="w-full" onClick={() => setOpenDialog(true)}>
          + Create Form
        </Button>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                {loading ? (
                  <div className="flex flex-col items-center">
                    <LoaderCircle className="animate-spin mb-4" />
                    <p className="text-center">{quote}</p>
                  </div>
                ) : (
                  <>
                    <Textarea
                      className="my-2"
                      placeholder="Write description of your AI form"
                      onChange={(e) => setUserInput(e.target.value)}
                      value={userInput}
                    />
                    <div className="flex gap-2 my-3 justify-end">
                      <Button
                        variant="destructive"
                        onClick={() => setOpenDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={onCreateForm} disabled={loading}>
                        Create
                      </Button>
                    </div>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div className="my-7">
          <Progress value={percentageFileCreated} />
          <h2 className="text-sm mt-2 text-gray-500">
            <strong>{formList?.length}</strong> Out of<strong> 3</strong> File
            Created
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
