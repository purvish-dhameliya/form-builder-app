"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/config";
import { JsonForms } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import FormUI from "../_components/FormUI";

const EditForm = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  const [jsonFormData, setJsonFormData] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState();

  useEffect(() => {
    if (user) {
      getFormData();
    }
  }, [user]);

  const getFormData = async () => {
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(
          and(
            eq(JsonForms.id, params.formid),
            eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      if (result.length > 0) {
        const parsedData = JSON.parse(result[0].jsonform);
        console.log("result:", parsedData);
        setJsonFormData(parsedData);
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  useEffect(() => {
    setJsonFormData(jsonFormData);
  }, [jsonFormData, updateTrigger]);

  const onFieldUpdate = (value, index) => {
    const updatedJsonFormData = { ...jsonFormData };
    const fieldToUpdate = updatedJsonFormData.Fields.find(
      (field) => field.FieldName === value.id
    );
    if (fieldToUpdate) {
      fieldToUpdate.FieldTitle = value.label;
      fieldToUpdate.Placeholder = value.placeholder;
      console.log(updatedJsonFormData);
      setJsonFormData(updatedJsonFormData);
      setUpdateTrigger(Date.now());
    } else {
      console.error(`Field with id ${value.id} not found`);
    }
  };

  return (
    <div className="p-10">
      <h2
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold transition-all"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 border rounded-lg shadow-md">Controllers</div>
        <div className="col-span-2 border rounded-lg p-4  justify-center flex">
          {jsonFormData ? (
            <FormUI jsonForms={jsonFormData} onFieldUpdate={onFieldUpdate} />
          ) : (
            <LoaderCircle className="animate-spin" />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
