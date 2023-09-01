import React from "react";

function LoadingJob() {
  return (
    <div
      className={` relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 mx-5 mt-7  `}
    >
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <div className="w-40 h-5 bg-gray-200 rounded-full animate-pulse"></div>

          <div className="w-20 h-4 mt-4 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        <div className="w-20 h-20 mr-5 bg-gray-200 rounded-md mt-3  animate-pulse"></div>
      </div>

      <div className="">
        <div className="w-3/4 h-3 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-3/4 h-3 mt-1 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-3/4 h-3 mt-1 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <div className="w-16 h-4 mt-2 bg-gray-200 rounded-full animate-pulse"></div>
          <dd className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></dd>
        </div>

        <div className="flex flex-col-reverse">
          <div className="w-16 h-4 mt-2 bg-gray-200 rounded-full animate-pulse"></div>
          <dd className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></dd>
        </div>
        <div className="flex flex-col-reverse">
          <div className="w-16 h-4 mt-2 bg-gray-200 rounded-full animate-pulse"></div>
          <dd className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></dd>
        </div>
        <div className="flex flex-col-reverse">
          <div className="w-16 h-4 mt-2 bg-gray-200 rounded-full animate-pulse"></div>
          <dd className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></dd>
        </div>
      </dl>
    </div>
  );
}

export default LoadingJob;
