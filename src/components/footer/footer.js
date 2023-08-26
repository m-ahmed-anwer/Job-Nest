import React from "react";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-50  rounded-lg shadow dark:bg-gray-900 p-3 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to={"/"} className="flex items-center mb-4 sm:mb-0">
            {/* <img src={image} className="h-8 mr-3" alt="Logo" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ml-4">
              Job Nest
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="/contact" className="mr-4 hover:underline md:mr-6 ">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link to={"/"} className="hover:underline">
            Job Nest™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
