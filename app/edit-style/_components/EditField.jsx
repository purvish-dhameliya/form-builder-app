"use client";
import React, { useState } from "react";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const EditField = ({ defaultValue, onUpdate, deleteField }) => {
  const [label, setLabel] = useState(defaultValue.FieldTitle);
  const [placeholder, setPlaceholder] = useState(defaultValue.Placeholder);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleUpdate = () => {
    onUpdate({
      id: defaultValue.FieldName,
      label: label,
      placeholder: placeholder
    });
  };

  return (
    <div className="flex gap-2 my-4">
      <Popover>
        <PopoverTrigger>
          {" "}
          <Edit className="h-4 w-4 text-gray-500 " />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit Fields</h2>
          <div>
            <label htmlFor="" className="text-xs">
              Label Name
            </label>
            <Input
              type="text"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="" className="text-xs">
              Placeholder Name
            </label>
            <Input
              type="text"
              value={placeholder}
              onChange={(e) => {
                setPlaceholder(e.target.value);
              }}
            />
          </div>
          <Button size="sm" className="mt-3" onClick={handleUpdate}>
            Update
          </Button>
        </PopoverContent>
      </Popover>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogTrigger asChild>
          <Trash className="h-4 w-4 text-red-500 cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to delete this field?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteField()}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditField;
