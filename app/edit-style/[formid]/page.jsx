"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import moment from "moment";
import { db } from "@/config";
import { JsonForms } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import FormUI from "../_components/FormUI";
import Controller from "../_components/Controller";

const EditForm = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  const [jsonFormData, setJsonFormData] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState("light");

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
            eq(JsonForms?.id, params?.formid),
            eq(JsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      if (result.length > 0) {
        const parsedData = JSON.parse(result[0]?.jsonform);
        setRecord(result[0]);
        setJsonFormData(parsedData);
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  useEffect(() => {
    if (updateTrigger) {
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const updateJsonFormInDb = async () => {
    const result = await db
      .update(JsonForms)
      .set({
        jsonform: JSON.stringify(jsonFormData)
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
  };

  const onFieldUpdate = (value) => {
    const updatedJsonFormData = { ...jsonFormData };
    const fieldToUpdate = updatedJsonFormData.Fields.find(
      (field) => field.FieldName === value.id
    );
    if (fieldToUpdate) {
      fieldToUpdate.FieldTitle = value.label;
      fieldToUpdate.Placeholder = value.placeholder;
      setJsonFormData(updatedJsonFormData);
      toast.success("Field Is Updated!!", {
        description: moment().format("DD/MM/yyyy"),
        position: "top-center",
        className: "h-32 w-64 bg-dark-500 text-white text-center"
      });
      setUpdateTrigger(Date.now());
    }
  };

  const deleteField = (indexRemove) => {
    const updatedFields = jsonFormData?.Fields?.filter(
      (item, index) => index !== indexRemove
    );
    setJsonFormData({ ...jsonFormData, Fields: updatedFields });
    setUpdateTrigger(Date.now());
    toast.error("Deleted Field!!!", {
      description: moment().format("DD/MM/yyyy"),
      duration: 2000,
      position: "top-center",
      className: "h-32 w-64 bg-dark-500 text-white text-center"
    });
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
        <div className="p-5 border rounded-lg shadow-md">
          <Controller />
        </div>
        <div className="col-span-2 border rounded-lg p-4  justify-center flex">
          {jsonFormData ? (
            <FormUI
              jsonForms={jsonFormData}
              onFieldUpdate={onFieldUpdate}
              deleteField={(index) => deleteField(index)}
              selectedTheme={selectedTheme}
            />
          ) : (
            <LoaderCircle className="animate-spin" />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
