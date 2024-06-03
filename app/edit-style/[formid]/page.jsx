"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { RWebShare } from "react-web-share";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  LoaderCircle,
  Share2,
  SquareArrowOutUpRight
} from "lucide-react";
import { toast } from "sonner";
import moment from "moment";
import { db } from "@/config";
import { JsonForms } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
const FormUI = dynamic(() => import("../_components/FormUI"));
const Controller = dynamic(() => import("../_components/Controller"));

const EditForm = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  const [jsonFormData, setJsonFormData] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedBackground, setSelectedBackground] = useState();
  const [selectedStyle, setSelectedStyle] = useState();

  useEffect(() => {
    user && getFormData();
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
        setSelectedBackground(result[0]?.background);
        setSelectedStyle(result[0]?.style);
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  useEffect(() => {
    updateTrigger && updateJsonFormInDb();
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
    toast.error("Deleted!!!");
  };

  const updateControllerFields = async (value, columnName) => {
    const result = await db
      .update(JsonForms)
      .set({
        [columnName]: value
      })
      .where(
        and(
          eq(JsonForms?.id, record?.id),
          eq(JsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      )
      .returning({ id: JsonForms?.id });

    toast.info("Form Changes Occure!!!");
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2
          className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold transition-all"
          onClick={() => router.back()}
        >
          <ArrowLeft /> Back
        </h2>

        <div className="flex gap-1 items-center justify-center">
          <Link href={"/aiForm/" + record?.id} target="_blank">
            <Button className="flex gap-2">
              <SquareArrowOutUpRight className="h-5 w-5" />
              Live Preview
            </Button>
          </Link>
          <RWebShare
            data={{
              text:
                jsonFormData?.FormHeading +
                " , Build Your Form in Seconds with AI Forms.",
              url: process.env.NEXT_PUBLIC_BASE_URL + "/aiForm/" + record?.id,
              title: jsonFormData?.formTitle
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button className="flex gap-2 bg-green-600 hover:bg-green-800">
              <Share2 />
              Share
            </Button>
          </RWebShare>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-8 border rounded-lg shadow-md ">
          <Controller
            selectedTheme={(value) => {
              updateControllerFields(value, "theme");
              setSelectedTheme(value);
            }}
            selectedBackground={(value) => {
              updateControllerFields(value, "background");
              setSelectedBackground(value);
            }}
            selectedStyle={(value) => {
              updateControllerFields(value, "style");
              setSelectedStyle(value);
            }}
            setSignInEnable={(value) => {
              updateControllerFields(value, "enabledSignIn");
            }}
          />
        </div>
        <div
          className="col-span-2 border rounded-lg p-4  justify-center flex"
          style={{
            backgroundImage: selectedBackground
          }}
        >
          {jsonFormData ? (
            <FormUI
              jsonForms={jsonFormData}
              onFieldUpdate={onFieldUpdate}
              deleteField={(index) => deleteField(index)}
              selectedTheme={selectedTheme}
              selectedStyle={selectedStyle}
              formid={params?.formid}
              enabledSignIn={record?.enabledSignIn}
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
