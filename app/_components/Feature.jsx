import React from "react";

const Feature = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-screen-xl px-4 text-center">
        <h2 className="text-2xl font-bold sm:text-4xl">Features</h2>
        <p className="mt-4 text-gray-600 sm:text-lg">
          Discover the powerful features that make our AI form creation tool
          stand out.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Live Preview</h3>
            <p className="mt-2 text-gray-600">
              See changes to your form in real-time with our live preview feature.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Theme Customization</h3>
            <p className="mt-2 text-gray-600">
              Personalize your forms with various themes, background colors, and more.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Sign-in Enabled</h3>
            <p className="mt-2 text-gray-600">
              Allow users to sign in to manage and submit their forms securely.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Form Sharing</h3>
            <p className="mt-2 text-gray-600">
              Easily share your forms via link or email.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Response Management</h3>
            <p className="mt-2 text-gray-600">
              Access and review responses from submitted forms effortlessly.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Powered by Gemini AI</h3>
            <p className="mt-2 text-gray-600">
              Utilize the power of Gemini AI to generate forms quickly and efficiently.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Stripe Payment Integration</h3>
            <p className="mt-2 text-gray-600">
              Seamlessly integrate Stripe for secure and easy payment processing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
