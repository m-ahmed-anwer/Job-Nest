import React from "react";

function TermsAndConditions() {
  return (
    <div className="items-center flex flex-col">
      <div className="terms-and-conditions p-8 md:w-3/4  flex flex-col justify-center ">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Terms and Conditions
        </h1>

        <div className="bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By using this website, you agree to comply with and be bound by
            these Terms and Conditions. If you do not agree to these Terms and
            Conditions, please do not use this website.
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. Use of the Website
          </h2>
          <p>
            You may use this website for lawful purposes only. You are
            prohibited from violating or attempting to violate any security
            features of the website, including, but not limited to:
          </p>
          <ul className="list-disc pl-6">
            <li>
              Accessing content or data not intended for you or logging onto a
              server that you are not authorized to access.
            </li>
            <li>
              Attempting to probe, scan, or test the vulnerability of the
              website or any associated system or network.
            </li>
            <li>
              Interfering with or disrupting the access of any user, host, or
              network, including, without limitation, sending a virus, spamming,
              or overloading.
            </li>
          </ul>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. User Registration
          </h2>
          <p>
            In order to access certain features of this website, you may be
            required to register for an account. You agree that all information
            provided during the registration process is accurate and up-to-date.
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. Privacy
          </h2>
          <p>
            Your use of this website is also governed by our Privacy Policy.
            Please review our Privacy Policy to understand our practices.
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Intellectual Property
          </h2>
          <p>
            All content on this website, including text, graphics, logos, icons,
            and images, is the property of Job Nest and is protected by
            intellectual property laws.
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            6. Limitation of Liability
          </h2>
          <p>
            Job Nest shall not be liable for any damages of any kind arising out
            of or relating to the use of this website.
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            7. Changes to Terms and Conditions
          </h2>
          <p>
            Job Nest reserves the right to modify or revise these Terms and
            Conditions at any time. By using this website, you agree to be bound
            by the current version of these Terms and Conditions.
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            8. Contact Information
          </h2>
          <p>
            If you have any questions or concerns regarding these Terms and
            Conditions, please contact us at{" "}
            <a
              href="mailto:ahmedanwer0094@gmail.com"
              className="text-blue-500 hover:underline"
            >
              ahmedanwer0094@gmail.com
            </a>
            .
          </p>
        </div>

        <p className="text-gray-700 mt-4">Last updated: Fri 1 Sep 2023</p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
