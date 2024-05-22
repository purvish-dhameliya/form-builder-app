"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/config/gemini-api";
import { useUser } from "@clerk/nextjs";
import { JsonForms } from "@/config/schema";
import { db } from "@/config";
import { useRouter } from "next/navigation";

const PROMPT =
  ", On the basis of description please give me form in json format with form title, form subheading, form field, form name, placeholder name, and form label in json format";

const CreateForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const routes = useRouter();
  const onCreateForm = async () => {
    console.log("user textarea::", userInput);
    setLoading(true);
    const result = await AiChatSession.sendMessage(
      "Description:" + userInput + PROMPT
    );
    console.log("user textarea ai::", result.response.text());
    if (result.response.text()) {
      const resp = await db
        .insert(JsonForms)
        .values({
          jsonform: result.response.text(),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD/MM/yyyy")
        })
        .returning({ id: JsonForms.id });

      console.log("jsonform new id::", resp[0].id);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create your form</DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                placeholder="Write description of your AI form"
                onChange={(e) => setUserInput(e.target.value)}
                value={userInput}
              />
              <div className="flex gap-2 my-3 justify-end">
                <Button onClick={() => onCreateForm()} disabled={loading}>
                  Create
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
