import React from "react";

function Stats() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 ">
            Trusted by Job Seekers and Employers
          </h2>

          <p className="mt-4 text-gray-500 sm:text-xl">
            Join our thriving community and benefit from our platform's
            features.
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-100">
            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Active Users
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                150,000+
              </dd>
            </div>

            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Job Listings
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                10,000+
              </dd>
            </div>

            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Successful Matches
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                5,000+
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export default Stats;
