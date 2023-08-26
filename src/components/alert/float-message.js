import { XCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

const FloatMessage = ({ message, hide }) => {
  return (
    <div
      className={`${
        hide ? "hidden opacity-0" : "opacity-100 "
      } flex  fixed bottom-10 right-10 backdrop-blur-sm text-gray-700 text-base shadow-md rounded-lg transition-opacity duration-500`}
    >
      <div className="bg-red-600 py-4 px-6 rounded-l-lg flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className="fill-current text-white"
          width="20"
          height="20"
        >
          <path
            fill-rule="evenodd"
            d="M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z"
          ></path>
        </svg>
      </div>
      <div className="px-4 py-6 bg-white rounded-r-lg backdrop-blur-sm flex justify-between items-center w-full border border-l-transparent border-gray-200">
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default FloatMessage;
