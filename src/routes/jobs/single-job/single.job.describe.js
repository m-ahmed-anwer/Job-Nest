import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { getJobById } from "../../../firebase/firebase";
import Loading from "../../../components/alert/loading";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [{ id: 1, name: "Jobs", to: "/jobs" }],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
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
  const [deadline, setDeadline] = useState(false);

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

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <div className="bg-white">
      {isLoading ? (
        <Loading loading={isLoading} value={true} />
      ) : jobDetail && jobDetail.job ? (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <Link
                      to={breadcrumb.to}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    <ChevronRightIcon className="h-5 w-4 text-gray-400" />
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <Link
                  to={"#"}
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {jobDetail.job.title}
                </Link>
              </li>
            </ol>
          </nav>

          {/* Job Title */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
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
                    {deadline
                      ? `Deadline has finished!`
                      : convertString(jobDetail.job.applicationDeadline)}
                  </p>
                </div>

                {!deadline && (
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
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {jobDetail.job.requirements.map((res) => (
                      <li key={res} className="text-gray-400">
                        <span className="text-gray-600">{res}</span>
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
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
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
        </div>
      ) : (
        <p className="my-10 mx-11 ">Job details not available.</p>
      )}
    </div>
  );
}
export default JobDescribe;
