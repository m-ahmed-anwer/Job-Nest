import React from "react";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="bg-[#fffeee] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg drop-shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-6">Last updated: Fri 18 Aug 2023</p>

        {/* Privacy policy content sections */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Introduction
          </h2>
          <p className="text-gray-700">
            Welcome to our Privacy Policy. This policy outlines how we collect,
            use, disclose, and protect your personal information. By using our
            services, you agree to the terms of this Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Information We Collect
          </h2>
          <p className="text-gray-700">
            We collect information that you provide directly to us, such as when
            you create an account, use our services, or communicate with us.
            This information may include your name, email, address, and other
            contact details.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Data Security
          </h2>
          <p className="text-gray-700">
            We take appropriate measures to protect your personal information
            from unauthorized access, loss, or alteration. However, no method of
            data transmission is completely secure, and we cannot guarantee its
            absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Your Choices
          </h2>
          <p className="text-gray-700">
            You can update your account information and communication
            preferences through your account settings. You can also have the
            option to choose not to receive specific types of communications.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-700">
            If you have any questions or concerns about our Privacy Policy,
            please contact us at{" "}
            <a href="mailto:ahmedanwer0094@gmail.com" className="text-blue-500">
              ahmedanwer0094@gmail.com
            </a>{" "}
            or directly{" "}
            <Link to={"/contact"} className="text-blue-500">
              Contact Us
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
