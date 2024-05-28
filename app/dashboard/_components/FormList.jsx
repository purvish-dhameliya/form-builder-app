"use client";
import { db } from "@/config";
import { JsonForms } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormItem from "./FormItem";

const FormList = () => {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  const getFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));

    console.log(result);
    setFormList(result);
  };

  useEffect(() => {
    user && getFormList();
  }, [user]);

  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
      {formList?.map((form, index) => (
        <div key={index}>
          <FormItem
            jsonform={JSON.parse(form.jsonform)}
            formRecord={form}
            refreshData={getFormList}
          />
        </div>
      ))}
    </div>
  );
};

export default FormList;
