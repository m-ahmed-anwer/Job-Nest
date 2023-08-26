import React from "react";

function LoadingJob() {
  return (
    <div
      class={` relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 mx-5 mt-7  `}
    >
      <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div class="sm:flex sm:justify-between sm:gap-4">
        <div>
          <div class="w-40 h-5 bg-gray-200 rounded-full animate-pulse"></div>

          <div class="w-20 h-4 mt-4 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        <div class="w-20 h-20 mr-5 bg-gray-200 rounded-md mt-3  animate-pulse"></div>
      </div>

      <div class="mt-4">
        <div class="w-3/4 h-3 bg-gray-200 rounded-full animate-pulse"></div>
        <div class="w-3/4 h-3 mt-1 bg-gray-200 rounded-full animate-pulse"></div>
        <div class="w-3/4 h-3 mt-1 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      <dl class="mt-6 flex gap-4 sm:gap-6">
        <div class="flex flex-col-reverse">
          <div class="w-20 h-4 mt-2 bg-gray-200 rounded-full animate-pulse"></div>
          <dd class="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></dd>
        </div>

        <div class="flex flex-col-reverse">
          <div class="w-20 h-4 mt-2 bg-gray-200 rounded-full animate-pulse"></div>
          <dd class="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></dd>
        </div>
      </dl>
    </div>
  );
}

export default LoadingJob;
