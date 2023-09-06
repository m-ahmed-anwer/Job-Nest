import React, { useContext, useEffect, useState } from "react";
import { PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../../context/user-context";
import Modal from "../alert/dialog-modal";
import Loading from "../alert/loading";
import { auth, getUserDocument } from "../../firebase/firebase";

function MyProfile() {
  const { currentUser } = useContext(UserContext);
  const { photoURL } = currentUser;
  const [isEdit, setIsEdit] = useState(false);
  const [databaseUser, setDatabaseUser] = useState({});
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const userData = await getUserDocument(user);
      setDatabaseUser(userData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const cancelHandle = () => {
    setOpen(true);
  };
  const editHandler = () => setIsEdit(true);
  const {
    category,
    displayName,
    email,
    userPhone,
    address,
    first_name,
    last_name,
  } = databaseUser;

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <section className=" py-1 bg-blueGray-50 ">
          <Modal
            message={
              "Are you sure you want to cancel? All changes will be lost."
            }
            open={open}
            setOpen={setOpen}
            error={"error"}
            buttonMessage={"OK"}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
          />
          <div className="w-full lg:w-3/4 px-4 mx-auto mt-6">
            <div className="flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {!isEdit && (
                  <div className="flex flex-col justify-end items-end">
                    <div className="group relative  flex justify-center">
                      <PencilSquareIcon
                        className="w-5 cursor-pointer "
                        onClick={editHandler}
                      />
                      <span className="absolute w-fit  top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                        Edit Profile
                      </span>
                    </div>
                  </div>
                )}

                <form>
                  <h6 className="text-blueGray-400 text-md mt-3 mb-6 uppercase">
                    User Information
                  </h6>
                  {!isEdit && (
                    <div className="items-center flex flex-col">
                      <div className="w-20 h-20 flex justify-center items-center mr-3 text-sm bg-gray-800 rounded-full md:mr-0 ring-2 ring-gray-300 ">
                        <div className="">
                          <img
                            className="w-20 h-20 rounded-full"
                            src={photoURL}
                            alt="profile"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email Address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="text"
                          value={email}
                          disabled
                          className="cursor-not-allowed px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          name="phone"
                          type="text"
                          value={userPhone}
                          disabled={!isEdit}
                          className=" px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                        />
                      </div>
                    </div>

                    {isEdit && (
                      <div className="col-span-full">
                        <label
                          htmlFor="cover-photo"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Profile Picture
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-4">
                          <div className="text-center">
                            <PhotoIcon
                              className="mx-auto h-16 w-16 text-gray-300"
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
                              PNG, JPG
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {category === "company" ? (
                      <div className="col-span-full">
                        <label
                          htmlFor="comapny"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Company Name
                        </label>
                        <div className="mt-2">
                          <input
                            id="comapny"
                            name="comapny"
                            value={displayName}
                            type="text"
                            disabled={!isEdit}
                            className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Fisrt Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="firstName"
                              name="firstName"
                              type="text"
                              value={first_name}
                              disabled={!isEdit}
                              className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Last Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="lastName"
                              name="lastName"
                              type="text"
                              value={last_name}
                              disabled={!isEdit}
                              className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <h6 className="text-blueGray-400 text-md mt-11 mb-4  uppercase">
                    Company details
                  </h6>
                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                          // value={address.country}
                          disabled={!isEdit}
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
                          disabled={!isEdit}
                          //value={address.street}
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
                          //value={address.city}
                          disabled={!isEdit}
                          className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="state"
                          //value={address.state}
                          id="state"
                          disabled={!isEdit}
                          className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="zip"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="zip"
                          id="zip"
                          //value={address.zip}
                          disabled={!isEdit}
                          className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                  {isEdit && (
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        onClick={cancelHandle}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-blue-700 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        Save Details
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default MyProfile;
