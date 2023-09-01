import {
  AcademicCapIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  HeartIcon,
  PresentationChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import React from "react";
const categories = [
  {
    id: 1,
    name: "Technology",
    description:
      "Explore opportunities in the ever-evolving world of technology.",
    icon: <ComputerDesktopIcon className="h-6 w-6" />,
  },
  {
    id: 2,
    name: "Healthcare",
    description:
      "Make a difference in people's lives by joining the healthcare industry.",
    icon: <HeartIcon className="h-6 w-6" />,
  },
  {
    id: 3,
    name: "Finance",
    description:
      "Navigate the world of finance and contribute to economic growth.",
    icon: <CurrencyDollarIcon className="h-6 w-6" />,
  },
  {
    id: 4,
    name: "Education",
    description:
      "Shape the future by joining the field of education and knowledge.",
    icon: <AcademicCapIcon className="h-6 w-6" />,
  },
  {
    id: 5,
    name: "Marketing",
    description:
      "Drive success through creative marketing and brand strategies.",
    icon: <PresentationChartBarIcon className="h-6 w-6" />,
  },
  {
    id: 6,
    name: "Hospitality",
    description:
      "Welcome guests and create memorable experiences in the hospitality industry.",
    icon: <SparklesIcon className="h-6 w-6" />,
  },
];

function CatergoriesList() {
  return (
    <div className="items-center flex flex-col">
      <div className="max-w-screen-xl ">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
          <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
            <h2 className="text-3xl sm:text-4xl font-bold my-7">
              Find your Career Path
            </h2>

            <p className="mt-4 md:text-lg text-gray-600">
              Navigate your career path by exploring jobs across various
              categories. Find the perfect match for your skills and
              aspirations.
            </p>

            <Link
              to={"/jobs"}
              className="mt-8 inline-block  py-3 px-6 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-lg"
            >
              Search for Jobs
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 mx-2 sm:grid-cols-3">
            {categories.map((item) => {
              return (
                <div
                  className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                  key={item.id}
                >
                  <span className="inline-block rounded-lg bg-gray-50 p-3">
                    {item.icon}
                  </span>

                  <h2 className="mt-2 font-bold">{item.name}</h2>

                  <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatergoriesList;
