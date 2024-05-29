import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Themes from "/app/_data/Themes";
import Style from "/app/_data/Style";
import GradientBg from "/app/_data/GradientBg";

const Controller = ({
  selectedTheme,
  selectedBackground,
  selectedStyle,
  setSignInEnable
}) => {
  const [showMore, setShowMore] = useState(6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        {/* Theme selection Controller  */}
        <div className="space-y-2">
          <h2 className="my-1">Selected Themes</h2>
          <Select onValueChange={selectedTheme}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {Themes.map((theme, index) => (
                <SelectItem value={theme.theme} key={index}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-l-md"
                      style={{ backgroundColor: theme.primary }}
                    ></div>
                    <div
                      className="w-5 h-5"
                      style={{ backgroundColor: theme.secondary }}
                    ></div>
                    <div
                      className="w-5 h-5"
                      style={{ backgroundColor: theme.accent }}
                    ></div>
                    <div
                      className="w-5 h-5 rounded-r-md"
                      style={{ backgroundColor: theme.neutral }}
                    ></div>
                    {theme.theme}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        {/* Background controller */}
        <div className="space-y-2">
          <h2 className="my-1">Background</h2>
          <div className="grid justify-center grid-cols-3 gap-5">
            {GradientBg.slice(0, showMore).map((bg, index) => (
              <motion.div
                key={index}
                onClick={() => selectedBackground(bg.gradient)}
                whileHover={{ scale: 1.05 }}
                className="w-full h-[70px] rounded-lg flex items-center cursor-pointer justify-center hover:border-black hover:border-2"
                style={{ background: bg.gradient }}
              >
                {index === 0 && "None"}
              </motion.div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="justify-center w-full my-1 font-bold border"
            size="sm"
            onClick={() => setShowMore(showMore > 6 ? 6 : 20)}
          >
            {showMore > 6 ? "Show Less" : "Show More"}
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="space-y-2">
          {/* Style Controller */}
          <Label className="text-lg font-semibold">Style</Label>
          <div className="grid w-full h-full grid-cols-3 gap-3">
            {Style.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center object-cover rounded-lg cursor-pointer hover:border-2"
                onClick={() => selectedStyle(item)}
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  width={90}
                  height={70}
                  className="object-cover rounded-lg"
                />
                <h2 className="text-lg font-semibold">{item.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        {/* Checkbox for Sign-in Enable */}
        <div className="flex items-center gap-2 my-4 mt-10">
          <Checkbox onCheckedChange={setSignInEnable} />
          <h2>Enable Social Authentication before submitting the form</h2>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Controller;
