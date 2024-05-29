import React from "react";

const CallToAction = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="mx-auto max-w-screen-xl px-4 text-center">
        <h2 className="text-2xl font-bold sm:text-4xl">Stay Connected</h2>
        <p className="mt-4 sm:text-lg">
          Connect with us to stay updated on the latest features, news, and
          updates about our AI form builder application.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="block rounded bg-white px-8 py-3 text-sm font-medium text-primary shadow hover:bg-gray-200 focus:outline-none focus:ring"
          >
            Contact Us
          </a>
          <a
            href="/faq"
            className="block rounded bg-white px-8 py-3 text-sm font-medium text-primary shadow hover:bg-gray-200 focus:outline-none focus:ring"
          >
            FAQ
          </a>
          <a
            href="/terms"
            className="block rounded bg-white px-8 py-3 text-sm font-medium text-primary shadow hover:bg-gray-200 focus:outline-none focus:ring"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default CallToAction;
