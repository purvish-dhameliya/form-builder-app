import React from "react";

const Discover = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="mx-auto max-w-screen-xl px-4 text-center">
        <h2 className="text-2xl font-bold sm:text-4xl">
          Real-World Applications
        </h2>
        <p className="mt-4 text-gray-600 sm:text-lg">
          Discover how businesses and individuals are using our AI-generated
          forms in real-world scenarios. From customer feedback forms to event
          registration, the possibilities are endless.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Customer Feedback</h3>
            <p className="mt-2 text-gray-600">
              Gather valuable customer insights effortlessly with AI-generated
              feedback forms tailored to your specific needs.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Event Registration</h3>
            <p className="mt-2 text-gray-600">
              Streamline your event planning process with customized
              registration forms created by our AI tool.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
