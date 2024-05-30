import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const FormSectionTwo = () => {
  return (
    <motion.section
      className="py-16 bg-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl px-4 mx-auto text-center">
        <h2 className="text-2xl font-bold sm:text-4xl">
          Create AI Forms with Simple Prompts
        </h2>
        <p className="mt-4 text-gray-600 sm:text-lg">
          Our AI-powered tool allows you to generate complex forms effortlessly.
          Simply provide a prompt describing the form you need, and our AI will
          handle the rest.
        </p>
        <div className="flex justify-center mt-8">
          <Image
            src="/hero.jpg"
            alt="AI Form Creation"
            className="rounded shadow-lg"
            width={600}
            height={400}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default FormSectionTwo;
