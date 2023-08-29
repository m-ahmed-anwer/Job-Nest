import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserDetailsContext } from "../../context/user-details";
import { postJob } from "../../firebase/firebase";
import Loading from "../../components/alert/loading";
import Modal from "../../components/alert/dialog-modal";
import { UserContext } from "../../context/user-context";

const formFeild = {
  title: "",
  description: "",
  type: "",
  experienceLevel: "",
  requirements: "",
  responsibilities: "",
  salary: "",
  applicationDeadline: "",
};
const check = {
  title: true,
  description: true,
  type: true,
  experienceLevel: true,
  requirements: true,
  responsibilities: true,
  salary: true,
  applicationDeadline: true,
};

function JobPost() {
  const upward = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => window.scrollTo(0, 0), []);

  const { details } = useContext(UserDetailsContext);
  const { email, displayName } = details;
  const [data, setData] = useState(formFeild);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(check);
  const [buttonMesage, setButtonMesage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const {
      title,
      description,
      type,
      experienceLevel,
      requirements,
      responsibilities,
      salary,
      applicationDeadline,
    } = data;

    const currentDate = new Date();
    const selectedDate = new Date(applicationDeadline);

    if (!title) {
      setError({ ...error, title: false });
      upward();
      return;
    }
    if (!description) {
      setError({ ...error, description: false });
      upward();
      return;
    }
    if (type === "") {
      setError({ ...error, type: false });
      upward();
      return;
    }
    if (experienceLevel === "") {
      setError({ ...error, experienceLevel: false });
      upward();
      return;
    }
    if (!requirements) {
      setError({ ...error, requirements: false });
      upward();
      return;
    }
    if (!responsibilities) {
      setError({ ...error, responsibilities: false });
      upward();
      return;
    }
    if (salary === "") {
      setError({ ...error, salary: false });
      upward();
      return;
    }
    if (selectedDate < currentDate) {
      setError({ ...error, applicationDeadline: false });
      upward();
      return;
    }
    if (!currentUser) {
      setOpen(true);
      setMessage("Please Login to Post a Job");
      setButtonMesage("OK");
      setErrorMessage("error");
      setData(formFeild);
      return;
    }

    setIsLoading(true);
    setError(check);

    try {
      await postJob(details, data);

      setData(formFeild);
      setOpen(true);
      setMessage("Your post is now on public 🎖️");
      setButtonMesage("Continue");
      setErrorMessage("success");
      setIsLoading(false);
    } catch (error) {
      setMessage(error.message);
      setOpen(true);
      setButtonMesage("Retry");
      setErrorMessage("error");
      setIsLoading(false);
    }
  };

  

  return (
    <>
      <Loading loading={isLoading} />
      <div className="mx-auto max-w-screen-2xl px-1 py-5 sm:px-10 lg:px-6 ">
        <Modal
          message={message}
          open={open}
          setOpen={setOpen}
          error={errorMessage}
          buttonMessage={buttonMesage}
        />
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <form className="" onSubmit={submitHandler} action="#">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Post A Job
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Job Title
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="title"
                          onChange={handleChange}
                          value={data.title}
                          id="title"
                          className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    {!error.title && (
                      <p class="text-red-500 text-xs italic">
                        Please fill this field.
                      </p>
                    )}
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        onChange={handleChange}
                        value={data.description}
                        rows={3}
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {!error.description && (
                        <p class="text-red-500 text-xs italic">
                          Please fill this field.
                        </p>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write few sentences about job.
                    </p>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      onChange={handleChange}
                      value={data.type}
                      className="px-2 block w-full rounded-md border-0 py-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value={""} selected>
                        Select the type
                      </option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                    </select>
                    {!error.type && (
                      <p class="text-red-500 text-xs italic">Select a type.</p>
                    )}
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="experienceLevel"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Experience Level
                    </label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      onChange={handleChange}
                      value={data.experienceLevel}
                      className="px-2 block w-full rounded-md border-0 py-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value={""} selected>
                        Select the level
                      </option>
                      <option value="entry-level">Entry-level</option>
                      <option value="mid-level">Mid-level</option>
                      <option value="senior">Senior</option>
                    </select>
                    {!error.experienceLevel && (
                      <p class="text-red-500 text-xs italic">Select a level.</p>
                    )}
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="requirements"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Requirements
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="requirements"
                        name="requirements"
                        onChange={handleChange}
                        value={data.requirements}
                        rows={4}
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {!error.requirements && (
                        <p class="text-red-500 text-xs italic">
                          Please fill this field.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="responsibilities"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Responsibilities
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="responsibilities"
                        onChange={handleChange}
                        value={data.responsibilities}
                        name="responsibilities"
                        rows={4}
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {!error.responsibilities && (
                        <p class="text-red-500 text-xs italic">
                          Please fill this field.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="salary"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Salary Range<small>{" (per month)"}</small>
                    </label>
                    <div className="mt-2">
                      <select
                        id="salary"
                        name="salary"
                        onChange={handleChange}
                        value={data.salary}
                        className="px-2 block w-full rounded-md border-0 py-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value={""} selected>
                          Select the range
                        </option>
                        <option value="50k-">50k-</option>
                        <option value="50-70k">50-70k</option>
                        <option value="70-100k">70-100k</option>
                        <option value="100-150k">100-150k</option>
                        <option value="150-200k">150-200k</option>
                        <option value="200-300k">200-300k</option>
                        <option value="300-500k">300-500k</option>
                        <option value="500k+">500k+</option>
                      </select>
                      {!error.salary && (
                        <p class="text-red-500 text-xs italic">
                          Select the salary range.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="applicationDeadline"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Application Deadline
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="applicationDeadline"
                        onChange={handleChange}
                        value={data.applicationDeadline}
                        id="applicationDeadline"
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {!error.applicationDeadline && (
                        <p class="text-red-500 text-xs italic">
                          Select a future deadline.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                */}
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Company Details
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Company Details will be listed down below, If there are any
                  updates please update the company detals and Post a Job.
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
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
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
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
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
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <input
                        id="country"
                        name="country"
                        type="text"
                        disabled
                        className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="street-address"
                        disabled
                        id="street-address"
                        className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        disabled
                        className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="region"
                        id="region"
                        disabled
                        className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        disabled
                        className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-blue-700 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default JobPost;
