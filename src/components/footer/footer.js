import React from "react";
import image from "../../images/suitcase.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <Link to={"/"} class="flex items-center mb-4 sm:mb-0">
            <img src={image} class="h-8 mr-3" alt="Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Job Nest
            </span>
          </Link>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="/contactus" class="mr-4 hover:underline md:mr-6 ">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/" class="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" class="mr-4 hover:underline md:mr-6 ">
                Licensing
              </Link>
            </li>
            <li>
              <Link to="/contactus" class="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link to={"/"} class="hover:underline">
            Job Nest™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
