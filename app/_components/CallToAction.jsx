import React from "react";
import { motion } from "framer-motion";
import moment from "moment"; // Example icons
import { Facebook } from "lucide-react";

const CallToAction = () => {
  return (
    <motion.footer
      className="py-8 text-white bg-gray-900"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="max-w-screen-xl px-4 mx-auto text-center">
        <h4 className="text-2xl font-bold sm:text-4xl">Stay Connected</h4>
        <p className="mt-4 sm:text-lg">
          Connect with us to stay updated on the latest features, news, and
          updates about our AI form builder application.
        </p>

        <div className="mt-8 text-sm text-gray-400">
          &copy; {moment().format("YYYY")} Purvish Dhameliya. All rights
          reserved.
        </div>
        <p className="mt-2">Contact: purvishdhameliya37@gmail.com</p>
      </div>
    </motion.footer>
  );
};

export default CallToAction;
