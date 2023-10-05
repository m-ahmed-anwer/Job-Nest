import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserDetailsContext } from "../../context/user-details";

function JobPost1() {
  const navigate = useNavigate();
  const { details } = useContext(UserDetailsContext);
  const { email, displayName, address, category } = details;

  return (
    <>
      {category === "company" ? (
        <div className="flex items-center sm:flex-col sm:mx-4">
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Company Details
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Check the Company Details, these details will be posted on job.
                If there are any changes please edit the company detals and Post
                a Job.
              </p>
              <div className="mt-1 text-sm leading-6 text-gray-600">
                <Link to={"/profile"}>
                  <span className="text-blue-600 cursor-pointer">
                    Click Here
                  </span>
                </Link>{" "}
                to edit company details.
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Company Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      disabled
                      value={displayName}
                      id="name"
                      className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      disabled
                      type="email"
                      value={email}
                      className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Country
                  </label>
                  <div className="mt-2">
                    <input
                      id="country"
                      name="country"
                      type="text"
                      value={address.country}
                      disabled
                      className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      value={address.street}
                      disabled
                      id="street-address"
                      className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={address.city}
                      disabled
                      className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      value={address.state}
                      disabled
                      className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="postal-code"
                      id="postal-code"
                      value={address.zip}
                      disabled
                      className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button
                type="button"
                className="rounded-md bg-blue-700 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() =>
                  navigate("/post/details", {
                    state: { confirmDetails: true },
                  })
                }>
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
}

export default JobPost1;
