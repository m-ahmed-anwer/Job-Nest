import React from "react";

function SingleJob({ job, company, isLoading }) {
  const { title, description, applicationDeadline } = job;
  const { displayName, email, photoURL, type, experienceLevel } = company;
  return (
    <div
      className={` relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 mx-5 mt-7  hover:bg-gray-50`}
    >
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            {title.toUpperCase()}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-600">
            {displayName}
          </p>
        </div>

        <div>
          <img
            alt="Paul Clapton"
            src={photoURL}
            className="h-16 w-16 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>

      <div className="my-4">
        <p className="max-w-[70ch] text-sm text-gray-500 max-h-[4em]">
          <p className="line-clamp-3">{description}</p>
        </p>
      </div>

      <div className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium mt-1 text-gray-600">Deadline</dt>
          <dd className="text-xs text-gray-500 mt-5">{applicationDeadline}</dd>
        </div>

        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium mt-1 text-gray-600">
            Reading time
          </dt>
          <dd className="text-xs text-gray-500 mt-5">{displayName}</dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium mt-1 text-gray-600">
            Reading time
          </dt>
          <dd className="text-xs text-gray-500 mt-5">{displayName}</dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium mt-1 text-gray-600">
            Reading time
          </dt>
          <dd className="text-xs text-gray-500 mt-5">{displayName}</dd>
        </div>
      </div>
    </div>
  );
}

export default SingleJob;
