import React from "react";

function SingleJob({ job, company, isLoading }) {
  const { title, description, applicationDeadline } = job;
  const { displayName, email, photoURL } = company;
  return (
    <a
      href="#"
      class={` relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 mx-5 mt-7  `}
    >
      <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div class="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 class="text-lg font-bold text-gray-900 sm:text-xl">
            {title.toUpperCase()}
          </h3>

          <p class="mt-1 text-xs font-medium text-gray-600">{displayName}</p>
        </div>

        <div>
          <img
            alt="Paul Clapton"
            src={photoURL}
            class="h-16 w-16 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>

      <div class="my-4">
        <p class="max-w-[70ch] text-sm text-gray-500 max-h-[4em]">
          <p class="line-clamp-3">{description}</p>
        </p>
      </div>

      <div class="mt-6 flex gap-4 sm:gap-6">
        <div class="flex flex-col-reverse">
          <dt class="text-sm font-medium mt-1 text-gray-600">Deadline</dt>
          <dd class="text-xs text-gray-500 mt-5">{applicationDeadline}</dd>
        </div>

        <div class="flex flex-col-reverse">
          <dt class="text-sm font-medium mt-1 text-gray-600">Reading time</dt>
          <dd class="text-xs text-gray-500 mt-5">{displayName}</dd>
        </div>
      </div>
    </a>
  );
}

export default SingleJob;
