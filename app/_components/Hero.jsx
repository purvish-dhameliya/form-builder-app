"use client";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
const Feature = dynamic(() => import("./Feature"));
const Discover = dynamic(() => import("./Discover"));
const FormSectionTwo = dynamic(() => import("./FormSectionTwo"));
const CallToAction = dynamic(() => import("./CallToAction"));

const Loading = () => <div>Loading...</div>;

const Hero = () => {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[50vh]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto text-center"
          >
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Create Your Form
              <strong className="font-extrabold text-primary sm:block">
                {" "}
                In Few Seconds.{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Easily create customized forms using the power of Gemini AI.
              Generate, preview, and share your forms seamlessly.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                className="block w-full px-12 py-3 text-sm font-medium text-white bg-red-600 rounded shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="/dashboard"
              >
                + Create AI Form
              </Link>

              <Button
                className="px-12 py-3 text-sm font-medium rounded text-destructive"
                variant="outline"
              >
                Explore
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<Loading />}>
        <FormSectionTwo />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Discover />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Feature />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <CallToAction />
      </Suspense>
    </div>
  );
};

export default Hero;
