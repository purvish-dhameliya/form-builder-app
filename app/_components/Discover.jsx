import React from "react";
import { motion } from "framer-motion";

const examples = [
  {
    title: "Customer Feedback",
    description:
      "Gather valuable customer insights effortlessly with AI-generated feedback forms tailored to your specific needs."
  },
  {
    title: "Event Registration",
    description:
      "Streamline your event planning process with customized registration forms created by our AI tool."
  }
];

const Discover = () => {
  return (
    <motion.section
      className="py-16 bg-gray-100"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="max-w-screen-xl px-4 mx-auto text-center">
        <h2 className="text-2xl font-bold sm:text-4xl">
          Real-World Applications
        </h2>
        <p className="mt-4 text-gray-600 sm:text-lg">
          Discover how businesses and individuals are using our AI-generated
          forms in real-world scenarios. From customer feedback forms to event
          registration, the possibilities are endless.
        </p>
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold">{example.title}</h3>
              <p className="mt-2 text-gray-600">{example.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Discover;
