import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import EditField from "./EditField";

const FormUI = ({ jsonForms, onFieldUpdate }) => {
  console.log("jsonForms:", jsonForms);

  return (
    <div className="border p-5 rounded-sm md:w-[600px]">
      <h2 className="font-bold text-center text-2xl">{jsonForms?.formTitle}</h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonForms?.FormHeading}
      </h2>
      {jsonForms?.Fields?.map((field, index) => (
        <div key={field?.FieldName} className="flex items-center gap-2">
          {field?.FieldType === "dropdown" ? (
            <div className="my-3 w-full">
              <Label className="text-xs text-gray-500">
                {field?.FieldTitle}
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field?.Placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((item, index) => (
                    <SelectItem value={item} key={index}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field?.FieldType === "radio" ? (
            <div className="my-3 w-full">
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
          ) : field?.FieldType === "checkbox" ? (
            <div className="my-3 w-full">
              <Label className="text-xs text-gray-500 mb-2">
                {field?.FieldTitle}
              </Label>
              {field?.options ? (
                field?.options?.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Checkbox id={`checkbox-${field.FieldName}-${index}`} />
                    <Label htmlFor={`checkbox-${field.FieldName}-${index}`}>
                      {item}
                    </Label>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 items-center">
                  <Checkbox id={`checkbox-${field.FieldName}`} />
                  <Label htmlFor={`checkbox-${field.FieldName}`}>
                    {field.FieldTitle}
                  </Label>
                </div>
              )}
            </div>
          ) : field?.FieldType === "textarea" ? (
            <div className="my-3 w-full">
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
            <div className="my-3 w-full">
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
          <div>
            <EditField
              defaultValue={field}
              onUpdate={(value) => onFieldUpdate(value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormUI;
