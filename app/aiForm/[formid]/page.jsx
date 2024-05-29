"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/config";
import { JsonForms } from "@/config/schema";
import { eq } from "drizzle-orm";
const FormUI = dynamic(() => import("@/app/edit-style/_components/FormUI"));

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
      className="flex items-center justify-center p-10"
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
        className="fixed flex items-center gap-2 px-3 py-1 text-white bg-black rounded-full cursor-pointer bottom-5 left-5"
        href={"/"}
      >
        <Image src={"/logo3.png"} width={86} height={86} alt="logo" />
        <span className="text-white">Build Your AI Form</span>
      </Link>
    </div>
  );
};

export default LiveAiForm;
