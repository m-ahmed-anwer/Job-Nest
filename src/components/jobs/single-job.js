import React from "react";

function SingleJob({ job, company }) {
  const { title, description, applicationDeadline, salary, type } = job;
  const { displayName, photoURL } = company;

  const convertString = (camelCaseString) => {
    const pattern = /(?<=[a-z])(?=[A-Z])/g;
    const words = camelCaseString
      .split(pattern)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    const readableString = words.join(" ");
    return readableString;
  };

  const deadline = new Date(applicationDeadline);
  const date = new Date();
  const timeDifference = deadline - date;
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const shouldShowJob = daysRemaining > 0;

  return (
    <>
      {shouldShowJob && (
        <div
          className={` relative block overflow-hidden rounded-lg border max-sm:w-full border-gray-100 p-4 sm:p-6 lg:p-8 sm:mx-5 mt-7  hover:bg-gray-50`}
        >
          <div className="sm:flex sm:justify-between sm:gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                {title.toUpperCase()}
              </h3>

              <p className="mt-1 text-xs font-medium text-gray-600">
                {convertString(displayName)}
              </p>
            </div>

            <div>
              <img
                alt="Job"
                src={photoURL}
                className="h-16 w-16 rounded-lg object-cover shadow-sm"
              />
            </div>
          </div>

          <div className="my-4">
            <div className="max-w-[70ch] text-sm text-gray-500 max-h-[4em]">
              <p className="line-clamp-3">{description}</p>
            </div>
          </div>

          <div className="mt-6 flex gap-4 sm:gap-6">
            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium mt-1 text-gray-600">
                Deadline
              </dt>
              <dd className="text-xs text-gray-500 mt-5">
                {daysRemaining} days more
              </dd>
            </div>

            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium mt-1 text-gray-600">
                Company
              </dt>
              <dd className="text-xs text-gray-500 mt-5">
                {convertString(displayName)}
              </dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium mt-1 text-gray-600">Time</dt>
              <dd className="text-xs text-gray-500 mt-5">
                {convertString(type)}
              </dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium mt-1 text-gray-600">Salary</dt>
              <dd className="text-xs text-gray-500 mt-5">{salary}</dd>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
        </div>
      )}
    </>
  );
}

export default SingleJob;
