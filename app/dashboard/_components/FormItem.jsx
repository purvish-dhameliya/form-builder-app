"use client";
import { Button } from "@/components/ui/button";
import { Edit, Share2, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { db } from "@/config";
import { useUser } from "@clerk/nextjs";
import { JsonForms } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";

const FormItem = ({ jsonform, formRecord, refreshData }) => {
  const { user } = useUser();
  const onDeleteForm = async () => {
    const result = await db
      .delete(JsonForms)
      .where(
        and(
          eq(JsonForms?.id, formRecord?.id),
          eq(JsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    if (result) {
      toast("Form Deleted!!!");
      refreshData();
    }
  };
  return (
    <div className="border shadow-sm rounded-lg p-4 ">
      <div className="flex gap-2 justify-between">
        <h2></h2>
        <AlertDialog asChild>
          <AlertDialogTrigger>
            <Trash className="h-5 w-5 text-red-500 cursor-pointer hover:scale-105 transition-all" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeleteForm()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <h2 className="text-lg text-black">{jsonform?.formTitle}</h2>
      <h2 className="text-sm text-gray-500">{jsonform?.FormHeading}</h2>
      <hr className="my-4"></hr>
      <div className="flex gap-2 justify-between">
        <Button size="sm" className="flex gap-2 cursor-pointer">
          {" "}
          <Share2 size={16} /> Share
        </Button>
        <Link href={"/edit-style/" + formRecord?.id}>
          <Button
            size="sm"
            className="flex gap-2 cursor-pointer"
            variant="outline"
          >
            {" "}
            <Edit size={16} /> Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FormItem;
