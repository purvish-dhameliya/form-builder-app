import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import moment from "moment";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { SignInButton, useUser } from "@clerk/nextjs";
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
import { Button } from "@/components/ui/button";
const EditField = dynamic(() => import("./EditField"));
import Style from "@/app/_data/Style";
import { db } from "@/config";
import { userResponses } from "@/config/schema";

const FormUI = ({
  jsonForms,
  onFieldUpdate,
  deleteField,
  selectedTheme,
  selectedStyle,
  editable = true,
  formid = 0,
  enabledSignIn = false
}) => {
  const [formData, setFormData] = useState({});
  const formRef = useRef();
  const { isSignedIn } = useUser();

  const selectedStyleObject = Style?.find(
    (style) => style?.id === selectedStyle?.id
  );
  const formStyle = selectedStyleObject?.style || {};

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    console.log("Form ID:", formid);

    try {
      const response = await db.insert(userResponses).values({
        jsonResponse: JSON.stringify(formData),
        createdAt: moment().format("YYYY-MM-DD"),
        formRef: formid
      });

      if (response) {
        formRef.current.reset();
        toast.success("User response inserted successfully!");
      }
    } catch (error) {
      toast.error("Error while saving form response!");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleFormSubmit}
      className="border p-5 rounded-sm md:w-[600px]"
      data-theme={selectedTheme}
      style={formStyle}
    >
      <h2 className="font-bold text-center text-2xl">{jsonForms?.formTitle}</h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonForms?.FormHeading}
      </h2>
      {jsonForms?.Fields?.map((field, index) => (
        <div key={field?.FieldName} className="flex items-center gap-2">
          {field?.FieldType === "select" ? (
            <div className="my-3 w-full">
              <Label className="text-xs text-gray-500">
                {field?.FieldTitle}
              </Label>
              <Select
                required={field?.Required}
                onValueChange={(value) =>
                  handleSelectChange(field?.FieldName, value)
                }
              >
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
              <RadioGroup
                defaultValue={field?.Placeholder}
                required={field?.Required}
                onChange={(value) =>
                  handleSelectChange(field?.FieldName, value)
                }
              >
                {field?.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field?.FieldType === "checkbox" ? (
            <div className="my-3 w-full">
              <Label className="text-xs text-gray-500 my-2">
                {field?.FieldTitle}
              </Label>
              <Checkbox
                checked={formData[field.FieldName] || false}
                onChange={handleCheckboxChange}
                required={field?.Required}
              />
              <Label htmlFor={`checkbox-${field.FieldName}`}>
                {field?.FieldTitle}
              </Label>
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
            </div>
          )}
          {editable && (
            <div>
              <EditField
                defaultValue={field}
                onUpdate={(value) => onFieldUpdate(value)}
                deleteField={() => deleteField(index)}
              />
            </div>
          )}
        </div>
      ))}
      {enabledSignIn ? (
        <Button type="submit">Submit</Button>
      ) : isSignedIn ? (
        <Button type="submit">Submit</Button>
      ) : (
        <Button>
          <SignInButton mode="modal">Sign In Before Submit</SignInButton>
        </Button>
      )}
    </form>
  );
};

export default FormUI;
