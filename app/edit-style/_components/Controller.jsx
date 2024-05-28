"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import Themes from "@/app/_data/Themes";
import { Button } from "@/components/ui/button";
import Gradientbg from "@/app/_data/Gradientbg";
import Style from "@/app/_data/Style";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Controller = ({
  selectedTheme,
  selectedBackground,
  selectedStyle,
  setSignInEnable
}) => {
  const [showMore, setShowMore] = useState(6);
  return (
    <div>
      {/* Theme selection Controller  */}
      <h2 className="my-1">Selected Themes</h2>
      <Select onValueChange={(value) => selectedTheme(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Themes?.map((theme, index) => (
            <SelectItem value={theme?.theme} key={index}>
              <div className="flex gap-3">
                <div className="flex ">
                  <div
                    className="h-5 w-5 rounded-l-md"
                    style={{ backgroundColor: theme.primary }}
                  ></div>

                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.secondary }}
                  ></div>

                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.accent }}
                  ></div>

                  <div
                    className="h-5 w-5 rounded-r-md"
                    style={{ backgroundColor: theme.neutral }}
                  ></div>
                </div>
                {theme.theme}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Background controller */}
      <h2 className="mt-8 my-1">Background </h2>
      <div className="grid grid-cols-3 gap-5 justify-center">
        {Gradientbg?.map(
          (bg, index) =>
            index < showMore && (
              <div
                key={index}
                onClick={() => selectedBackground(bg?.gradient)}
                className="w-full h-[70px] rounded-lg flex items-center cursor-pointer hover:border-black hover:border-2 justify-center"
                style={{ background: bg?.gradient }}
              >
                {index === 0 && "None"}
              </div>
            )
        )}
      </div>
      <Button
        variant="ghost"
        className="w-full my-1 justify-center border font-bold "
        size="sm"
        onClick={() => setShowMore(showMore > 6 ? 6 : 20)}
      >
        {showMore > 6 ? "Show Less" : "Show More"}
      </Button>
      {/* Style Controller */}
      <Label>Style</Label>
      <div className="grid grid-cols-3 gap-3">
        {Style?.map((item, index) => (
          <div key={index}>
            <div
              className="cursor-pointer hover:border-2 rounded-lg flex justify-center items-center object-cover"
              onClick={() => selectedStyle(item)}
              style={{ width: "100%", height: "100px" }}
            >
              <Image
                src={item.img}
                alt="image"
                width={90}
                height={70}
                className="rounded-lg object-cover"
              />
            </div>
            <h2 className="text-center">{item?.name}</h2>
          </div>
        ))}
      </div>

      <div className="flex gap-2 my-4 items-center mt-10">
        <Checkbox onCheckedChange={(e) => setSignInEnable(e)} />{" "}
        <h2>Enable Social Authentication before submit the form</h2>
      </div>
    </div>
  );
};

export default Controller;
