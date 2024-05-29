"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { db } from "@/config";
import { JsonForms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
const FormItem = dynamic(() => import("./FormItem"));

const FormList = () => {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  const getFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms?.id));

    setFormList(result);
  };

  useEffect(() => {
    user && getFormList();
  }, [user]);

  return (
    <div className="grid grid-cols-1 gap-3 mt-5 md:grid-cols-2">
      {formList?.map((form, index) => (
        <div key={index}>
          <FormItem
            jsonform={JSON.parse(form?.jsonform)}
            formRecord={form}
            refreshData={getFormList}
          />
        </div>
      ))}
    </div>
  );
};

export default FormList;
