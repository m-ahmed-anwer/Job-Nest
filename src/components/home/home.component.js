import React, { useEffect, useState } from "react";
import Stats from "./stats";
import CompaniesList from "./companies";
import CTA from "./cta";
import CatergoriesList from "./categorie.list";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [search, setSearch] = useState("");
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <section>
      {/* Heads up! 👋 */}

      <section className="bg-white dark:bg-gray-900">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img
            className="w-full dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
            alt="IMG"
          />

          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Discover Your Next Opportunity with Job Nest
            </h2>
            <p className="my-11 text-gray-500 md:text-lg dark:text-gray-400">
              Discover opportunities and connect with like-minded professionals.
              Whether you're starting anew or aiming higher, Job Nest equips you
              with the tools you need for your career journey.
            </p>
            <div class="flex flex-1 items-center justify-center p-6">
              <div class="w-full max-w-lg">
                <form class=" sm:flex sm:items-center">
                  <input
                    id="job"
                    name="job"
                    class="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search for a Job"
                    type="search"
                    onChange={handleChange}
                    value={search}
                  />
                  <button
                    type="submit"
                    class="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/** Company list  */}
      <CompaniesList />

      {/** Company list  */}
      <CatergoriesList />

      {/** stats*/}
      <Stats />

      {/** Context 3 */}
      <CTA />
    </section>
  );
}

export default Home;
