import React from "react";
import Image from "next/image";

const FormSectionTwo = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-screen-xl px-4 text-center">
        <h2 className="text-2xl font-bold sm:text-4xl">
          Create AI Forms with Simple Prompts
        </h2>
        <p className="mt-4 text-gray-600 sm:text-lg">
          Our AI-powered tool allows you to generate complex forms effortlessly.
          Simply provide a prompt describing the form you need, and our AI will
          handle the rest.
        </p>
        <div className="mt-8 flex justify-center">
          <Image
            src="/hero.jpg"
            alt="AI Form Creation"
            className="rounded shadow-lg"
            width={600}
            height={400}
          />
        </div>
      </div>
    </section>
  );
};

export default FormSectionTwo;
