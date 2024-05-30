import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <motion.footer
      className="py-8 text-white bg-gray-900"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="max-w-screen-xl px-4 mx-auto text-center">
        <h2 className="text-2xl font-bold sm:text-4xl">Stay Connected</h2>
        <p className="mt-4 sm:text-lg">
          Connect with us to stay updated on the latest features, news, and
          updates about our AI form builder application.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="/contact"
            className="block px-8 py-3 text-sm font-medium bg-white rounded shadow text-primary hover:bg-gray-200 focus:outline-none focus:ring"
          >
            Contact Us
          </a>
          <a
            href="/faq"
            className="block px-8 py-3 text-sm font-medium bg-white rounded shadow text-primary hover:bg-gray-200 focus:outline-none focus:ring"
          >
            FAQ
          </a>
          <a
            href="/terms"
            className="block px-8 py-3 text-sm font-medium bg-white rounded shadow text-primary hover:bg-gray-200 focus:outline-none focus:ring"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default CallToAction;
