import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { db } from "@/config";
import { userResponses } from "@/config/schema";
import { eq } from "drizzle-orm";

const FormListResponse = ({ jsonForm, formRecord }) => {
  const [loading, setLoading] = useState(false);
  const ExportData = async () => {
    let jsonData = [];
    setLoading(true);
    const result = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses?.formRef, formRecord?.id));

    if (result) {
      result.forEach((item) => {
        const jsonItem = JSON.parse(item?.jsonResponse);
        jsonData.push(jsonItem);
      });
      setLoading(false);
    }
    exportToExcel(jsonData);
  };

  const exportToExcel = (jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, jsonForm?.formTitle + ".xlsx");
  };

  return (
    <div className="border shadow-sm rounded-lg p-4 my-5">
      <h2 className="text-lg text-black">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm text-gray-500">{jsonForm?.FormHeading}</h2>
      <hr className="my-4"></hr>
      <div className="flex  justify-between">
        <h2>
          <strong>45</strong> responses
        </h2>
        <Button
          onClick={() => ExportData()}
          className=""
          size="sm"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Export"}
        </Button>
      </div>
    </div>
  );
};

export default FormListResponse;
