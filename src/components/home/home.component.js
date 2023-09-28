import React, { useContext, useEffect } from "react";
import Stats from "./stats";
import CompaniesList from "./companies";
import CTA from "./cta";
import CatergoriesList from "./categorie.list";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { SearchContext } from "../../context/search.context";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const { search, setSearch } = useContext(SearchContext);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    navigate("/jobs");
  };

  return (
    <section>
      {/* Heads up! 👋 */}

      <section className="bg-white dark:bg-gray-900">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img
            className="w-full dark:hidden"
            src="https://www.twentyfournews.com/wp-content/uploads/2021/01/Careers-e1553244124511.jpg"
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
            <div className="flex flex-1 items-center justify-center p-6">
              <div className="w-full max-w-xl">
                <form className="max-w-md px-4" onSubmit={submitHandler}>
                  <div className="relative ">
                    <MagnifyingGlassIcon
                      className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-900 left-3 hover:cursor-pointer"
                      onClick={submitHandler}
                    />
                    <input
                      type="text"
                      placeholder="Search for Jobs"
                      onChange={handleChange}
                      value={search || ""}
                      className="w-full py-3 pl-12 pr-4 text-black border placeholder:text-gray-500 outline-none bg-gray-100 focus:bg-gray-50 focus:border-blue-600 rounded-full"
                    />
                  </div>
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
