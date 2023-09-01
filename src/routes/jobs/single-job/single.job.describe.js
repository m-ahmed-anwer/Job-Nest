import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { getJobById } from "../../../firebase/firebase";
import Loading from "../../../components/alert/loading";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function JobDescribe() {
  const { jobId } = useParams();
  const [jobDetail, setJobDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const convertString = (camelCaseString) => {
    const pattern = /(?<=[a-z])(?=[A-Z])/g;
    const words = camelCaseString
      .split(pattern)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    const readableString = words.join(" ");
    return readableString;
  };

  const currentDate = Date();
  const getDate = (value) => {
    return new Date(value);
  };

  useEffect(() => {
    const getJob = async () => {
      setIsLoading(true);
      try {
        const job = await getJobById(jobId);
        setJobDetail(job);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
      setIsLoading(false);
    };

    getJob();
  }, [jobId]);

  return (
    <div className="bg-white">
      {isLoading ? (
        <Loading loading={isLoading} value={true} />
      ) : jobDetail && jobDetail.job ? (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ul className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <li>
                <div className="flex items-center">
                  <Link
                    to={"/jobs"}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    Jobs
                  </Link>
                  <ChevronRightIcon className="h-5 w-4 text-gray-400" />
                </div>
              </li>

              <li className="text-sm">
                <Link
                  to={"#"}
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {jobDetail.job.title}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Job Title */}
          <div className="mx-auto max-w-2xl px-4 pb-5 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-5 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h3 className="text-sm mb-6 font-medium text-gray-900">
                Job Role
              </h3>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {jobDetail.job.title.toUpperCase()}
              </h1>
            </div>

            {/* Salary */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="text-sm font-medium text-gray-700 mb-4">
                Expected Salary
              </h2>
              <p className="text-3xl tracking-tight text-gray-900">
                Rs. {jobDetail.job.salary}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <form>
                {/* Experience */}
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Experience Level
                  </h3>

                  <p className="text-md tracking-tight text-gray-700">
                    {convertString(jobDetail.job.experienceLevel)}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Job Time
                  </h3>

                  <p className="text-md tracking-tight text-gray-700">
                    {convertString(jobDetail.job.type)}
                  </p>
                </div>
                <div className="my-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Application Deadline
                  </h3>

                  <p className="text-md tracking-tight text-red-500">
                    {getDate(currentDate) <
                    getDate(jobDetail.job.applicationDeadline)
                      ? jobDetail.job.applicationDeadline
                      : "Deadline has finished !"}
                  </p>
                </div>

                {getDate(currentDate) <
                  getDate(jobDetail.job.applicationDeadline) && (
                  <button
                    type="submit"
                    className="mt-16 flex w-full sm:w-3/4 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Apply for Job
                  </button>
                )}
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <div className="space-y-6 mt-11">
                  <h3 className="text-sm font-medium text-gray-900">
                    Description
                  </h3>
                  <p className="text-base text-gray-600">
                    {jobDetail.job.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Requirements
                </h3>

                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {jobDetail.job.requirements.map((req) => (
                      <li key={req} className="text-gray-400">
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Responsibilities
                </h3>
                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {jobDetail.job.responsibilities.map((res) => (
                      <li key={res} className="text-gray-400">
                        <span className="text-gray-600">{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-2xl px-4 pb-16  sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-5">
            <div className="lg:col-span-2  lg:pr-8">
              <h1 className="text-lg mb-6 font-medium text-gray-900">
                Company Details
              </h1>
            </div>
            <div className=" lg:col-span-2 lg:col-start-1  lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-1">
              {/* Description and details */}
              <div className="flex md:space-x-16 flex-col md:flex-row">
                <div className="mt-6 ">
                  <h3 className="text-sm font-medium text-gray-900">
                    Company Name
                  </h3>
                  <p className="text-base mt-1 mb-5 md:mt-5 text-gray-600">
                    {jobDetail.company.displayName}
                  </p>
                </div>
                <div className=" mt-6 ">
                  <h3 className="text-sm font-medium text-gray-900">Email</h3>
                  <p className="text-base mt-1 mb-5 md:mt-5 text-blue-600 hover:text-blue-800">
                    <a href={`mailto:${jobDetail.company.email}`}>
                      {jobDetail.company.email}
                    </a>
                  </p>
                </div>
                {jobDetail.company.userPhone && (
                  <div className=" mt-6 ">
                    <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                    <p className="text-base mt-1 mb-5 md:mt-5 text-blue-600 hover:text-blue-800">
                      <a href={`tel:${jobDetail.company.userPhone}`}>
                        {jobDetail.company.userPhone}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="my-10 mx-11 ">Job details not available.</p>
      )}
    </div>
  );
}
export default JobDescribe;
