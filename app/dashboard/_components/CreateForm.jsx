"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/config/gemini-api";
import { useUser } from "@clerk/nextjs";
import { JsonForms } from "@/config/schema";
import { db } from "@/config";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const PROMPT =
  ", On the basis of the description, please generate a form in JSON format with the following consistent keys: 'formTitle', 'FormHeading', 'Fields' (array of objects with keys 'FieldName', 'FieldTitle', 'FieldType', 'Placeholder', 'options' (if applicable), and 'Required'). Ensure all keys are exactly as specified.";

const CreateForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onCreateForm = async () => {
    console.log("User textarea input:", userInput);
    setLoading(true);
    try {
      const result = await AiChatSession.sendMessage(
        "Description: " + userInput + PROMPT
      );
      const jsonResponse = await result.response.text();
      console.log("AI response:", jsonResponse);

      if (jsonResponse) {
        const resp = await db
          .insert(JsonForms)
          .values({
            jsonform: jsonResponse,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD/MM/yyyy"),
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
                <Button
                  variant="destructive"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={onCreateForm} disabled={loading}>
                  {loading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Create"
                  )}
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
