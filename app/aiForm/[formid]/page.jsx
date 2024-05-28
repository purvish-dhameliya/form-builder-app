"use client";
import React, { useEffect, useState } from "react";
import FormUI from "@/app/edit-style/_components/FormUI";
import { db } from "@/config";
import { JsonForms } from "@/config/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

const LiveAiForm = ({ params }) => {
  const [record, setRecord] = useState();
  const [jsonFormData, setJsonFormData] = useState(null);

  useEffect(() => {
    if (params) {
      getFormData();
    }
  }, [params]);

  const getFormData = async () => {
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(eq(JsonForms?.id, Number(params?.formid)));
      if (result.length > 0) {
        setRecord(result[0]);
        setJsonFormData(JSON.parse(result[0]?.jsonform));
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  return (
    <div
      className="flex p-10 justify-center items-center h-screen"
      style={{ backgroundImage: record?.background }}
    >
      {record && (
        <FormUI
          jsonForms={jsonFormData}
          onFieldUpdate={() => console.log()}
          deleteField={() => console.log()}
          selectedStyle={record?.style}
          selectedTheme={record?.theme}
          editable={false}
          formid={record?.id}
        />
      )}
      <Link
        className="flex gap-2 items-center bg-black px-3 text-white py-1 rounded-full fixed bottom-5 left-5 cursor-pointer"
        href={"/"}
      >
        <Image src={"/logo.svg"} width={86} height={86} alt="logo" />
        <span className="text-white">Build Your AI Form</span>
      </Link>
    </div>
  );
};

export default LiveAiForm;
