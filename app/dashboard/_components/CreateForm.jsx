"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
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

const quotes = [
  "The best way to get started is to quit talking and begin doing. - Walt Disney",
  "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. - Winston Churchill",
  "Don’t let yesterday take up too much of today. - Will Rogers",
  "You learn more from failure than from success. Don’t let it stop you. Failure builds character. - Unknown",
  "It’s not whether you get knocked down, it’s whether you get up. - Vince Lombardi",
  "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you. - Steve Jobs",
  "People who are crazy enough to think they can change the world, are the ones who do. - Rob Siltanen",
  "Failure will never overtake me if my determination to succeed is strong enough. - Og Mandino",
  "Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk. That’s the classic entrepreneur. - Mohnish Pabrai",
  "We may encounter many defeats but we must not be defeated. - Maya Angelou"
];

const CreateForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState("");
  const { user } = useUser();
  const router = useRouter();

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
    if (loading) {
      const interval = setInterval(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
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
    </div>
  );
};

export default CreateForm;
