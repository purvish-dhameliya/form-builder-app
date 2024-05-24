import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormUI = ({ jsonForms }) => {
  console.log("jsonForms:", jsonForms);

  return (
    <div className="border p-5 rounded-sm md:w-[600px]">
      <h2 className="font-bold text-center text-2xl">{jsonForms?.formTitle}</h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonForms?.FormHeading}
      </h2>
      {jsonForms?.Fields?.map((field) => (
        <div key={field?.FieldName}>
          {field?.FieldType === "select" ? (
            <div className="my-3">
              <Label className="text-xs text-gray-500">
                {field?.FieldTitle}
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field?.Placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field?.options?.map((item, index) => (
                    <SelectItem value={item} key={index}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field?.FieldType === "radio" ? (
            <div className="my-3">
              <Label className="text-xs text-gray-500">
                {field?.FieldTitle}
              </Label>
              <RadioGroup defaultValue={field?.Placeholder}>
                {field?.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field?.FieldType === "textarea" ? (
            <div className="my-3">
              <Label className="block text-xs text-gray-500 mb-2">
                {field?.FieldTitle}
              </Label>
              <Textarea
                name={field?.FieldName}
                placeholder={field?.Placeholder}
                className="p-2 w-full"
                required={field?.Required}
              />
            </div>
          ) : (
            <div className="my-3">
              <Label className="block text-xs text-gray-500 mb-2">
                {field?.FieldTitle}
              </Label>
              <Input
                type={field?.FieldType}
                name={field?.FieldName}
                placeholder={field?.Placeholder}
                className="p-2 w-full"
                required={field?.Required}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormUI;
