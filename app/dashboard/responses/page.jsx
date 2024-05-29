"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config";
import { JsonForms } from "@/config/schema";
import { eq } from "drizzle-orm";
const FormListResponse = dynamic(() =>
  import("./_components/FormListResponse")
);

const Responses = () => {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getFormList();
    }
  }, [user]);

  const getFormList = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(
          eq(JsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress)
        );

      setFormList(result);
    } catch (error) {
      console.error("Error fetching form list:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="flex items-center justify-between text-3xl font-bold">
        Responses
      </h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {formList?.map((form, index) => (
          <FormListResponse
            key={index}
            jsonForm={JSON.parse(form?.jsonform)}
            formRecord={form}
          />
        ))}
      </div>
    </div>
  );
};

export default Responses;
