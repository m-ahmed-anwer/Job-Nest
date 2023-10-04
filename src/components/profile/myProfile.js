import React, { useContext, useEffect, useState } from "react";
import { PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../../context/user-context";
import Modal from "../alert/dialog-modal";
import Loading from "../alert/loading";
import {
  auth,
  getUserDocument,
  updateCompanyInJobs,
  updateUserDocument,
} from "../../firebase/firebase";
import { updateProfile } from "firebase/auth";
import { UserDetailsContext } from "../../context/user-details";

const check = {
  company: false,
  first_name: false,
  last_name: false,
  userPhone: false,
  country: false,
  street: false,
  city: false,
  state: false,
  zip: false,
};
const form = {
  email: "",
  userPhone: "",
  displayName: "",
  first_name: "",
  last_name: "",
  address: {
    country: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  },
};

function MyProfile() {
  const { currentUser, setDatabaseUser } = useContext(UserContext);
  const { photoURL } = currentUser;
  const [isEdit, setIsEdit] = useState(false);
  const [dataUser, setDatauser] = useState({});
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = auth.currentUser;
  const [editedUserData, setEditedUserData] = useState(form);
  const [error, setError] = useState(check);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const userData = await getUserDocument(user);
      setEditedUserData({
        email: userData.email,
        userPhone: userData.userPhone,
        displayName: userData.displayName,
        first_name: userData.first_name,
        last_name: userData.last_name,
        address: {
          country: userData.address.country,
          street: userData.address.street,
          city: userData.address.city,
          state: userData.address.state,
          zip: userData.address.zip,
        },
      });
      setDatauser(userData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const editHandler = () => setIsEdit(true);
  const { category } = dataUser;
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [buttonMessage, setButtonMesage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setDetails } = useContext(UserDetailsContext);

  const handleImage = (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        setSelectedFile(file);
        const reader = new FileReader();

        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        console.error("Selected file is not an image.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "country" ||
      name === "city" ||
      name === "state" ||
      name === "street" ||
      name === "zip"
    ) {
      setEditedUserData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [name]: value },
      }));
    } else {
      setEditedUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const isValidPhoneNumber = (phone) => {
    return phone.length === 10 && phone.startsWith("07");
  };

  const submitHandle = async (event) => {
    event.preventDefault();

    if (!isValidPhoneNumber(editedUserData.userPhone)) {
      setError({ ...error, userPhone: true });
      return;
    }

    if (category !== "company") {
      if (!editedUserData.first_name) {
        setError({ ...error, first_name: true });
        return;
      }
      if (!editedUserData.last_name) {
        setError({ ...error, last_name: true });
        return;
      }
    }
    if (category === "company") {
      if (!editedUserData.displayName) {
        setError({ ...error, company: true });
        return;
      }
      if (!editedUserData.address.country) {
        setError({ ...error, country: true });
        return;
      }
      if (!editedUserData.address.street) {
        setError({ ...error, street: true });
        return;
      }
      if (!editedUserData.address.city) {
        setError({ ...error, city: true });
        return;
      }
      if (!editedUserData.address.state) {
        setError({ ...error, state: true });
        return;
      }
      if (!editedUserData.address.zip) {
        setError({ ...error, zip: true });
        return;
      }
    }

    setIsLoading(true);
    try {
      if (category === "company") {
        await updateProfile(user, { displayName: editedUserData.displayName });
        await updateCompanyInJobs(currentUser.email, {
          displayName: editedUserData.displayName,
          address: editedUserData.address,
          first_name: editedUserData.first_name,
          last_name: editedUserData.last_name,
          userPhone: editedUserData.userPhone,
        });
      } else if (category !== "company") {
        await updateProfile(user, {
          displayName:
            editedUserData.first_name + " " + editedUserData.last_name,
        });
      }
      await updateUserDocument(user, editedUserData);
      const userData = await getUserDocument(user);
      setDetails(userData);
      setDatabaseUser(userData);
      setError(check);
      setIsLoading(false);
      setOpen(true);
      setMessage("All the details edited.");
      setButtonMesage("OK");
      setErrorMessage("ok");

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setMessage(error.message);
      setOpen(true);
      setButtonMesage("Retry");
      setErrorMessage("error");
      setError(check);
    }
  };

  const cancelHandle = () => {
    setOpen(true);
    setMessage("Are you sure you want to cancel? All changes will be lost.");
    setButtonMesage("OK");
    setErrorMessage("error");
  };
  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <section className=" py-1 bg-blueGray-50 ">
          <Modal
            message={message}
            open={open}
            setOpen={setOpen}
            error={errorMessage}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            buttonMessage={buttonMessage}
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

                <form onSubmit={submitHandle}>
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
                      <div className="mt-2 relative flex items-center">
                        <input
                          id="email"
                          name="email"
                          type="text"
                          value={editedUserData.email}
                          disabled
                          className="cursor-not-allowed px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="userPhone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          onChange={handleInputChange}
                          id="userPhone"
                          name="userPhone"
                          type="number"
                          value={editedUserData.userPhone}
                          disabled={!isEdit}
                          className=" px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                        />
                      </div>
                      {error.phone && (
                        <p className="text-red-500 text-xs italic mt-1">
                          Incorrect Phone Number.
                        </p>
                      )}
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
                            {imagePreview ? (
                              <img
                                src={imagePreview}
                                alt="Preview"
                                width="200"
                              />
                            ) : (
                              <PhotoIcon
                                className="mx-auto h-16 w-16 text-gray-300"
                                aria-hidden="true"
                              />
                            )}

                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  onChange={handleImage}
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                              PNG, JPG, JPEG
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {category === "company" ? (
                      <div className="col-span-full">
                        <label
                          htmlFor="displayName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Company Name
                        </label>
                        <div className="mt-2">
                          <input
                            onChange={handleInputChange}
                            id="displayName"
                            name="displayName"
                            value={editedUserData.displayName}
                            type="text"
                            disabled={!isEdit}
                            className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                          />
                        </div>
                        {error.company && (
                          <p className="text-red-500 text-xs italic mt-1">
                            Please fill out this field.
                          </p>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Fisrt Name
                          </label>
                          <div className="mt-2">
                            <input
                              onChange={handleInputChange}
                              id="first_name"
                              name="first_name"
                              type="text"
                              value={editedUserData.first_name}
                              disabled={!isEdit}
                              className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                            />
                          </div>
                          {error.first_name && (
                            <p className="text-red-500 text-xs italic mt-1">
                              Please fill out this field.
                            </p>
                          )}
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="last_name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Last Name
                          </label>
                          <div className="mt-2">
                            <input
                              onChange={handleInputChange}
                              id="last_name"
                              name="last_name"
                              type="text"
                              value={editedUserData.last_name}
                              disabled={!isEdit}
                              className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                            />
                          </div>
                          {error.last_name && (
                            <p className="text-red-500 text-xs italic mt-1">
                              Please fill out this field.
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {category === "company" && (
                    <>
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
                              onChange={handleInputChange}
                              id="country"
                              name="country"
                              type="text"
                              value={editedUserData.address.country}
                              disabled={!isEdit}
                              className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                            />
                          </div>
                          {error.country && (
                            <p className="text-red-500 text-xs italic mt-1">
                              Please fill out this field.
                            </p>
                          )}
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              onChange={handleInputChange}
                              type="text"
                              name="street"
                              disabled={!isEdit}
                              value={editedUserData.address.street}
                              id="street"
                              className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                            />
                          </div>
                          {error.street && (
                            <p className="text-red-500 text-xs italic mt-1">
                              Please fill out this field.
                            </p>
                          )}
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
                              onChange={handleInputChange}
                              type="text"
                              name="city"
                              id="city"
                              value={editedUserData.address.city}
                              disabled={!isEdit}
                              className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                            />
                          </div>
                          {error.city && (
                            <p className="text-red-500 text-xs italic mt-1">
                              Please fill out this field.
                            </p>
                          )}
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
                              onChange={handleInputChange}
                              type="text"
                              name="state"
                              value={editedUserData.address.state}
                              id="state"
                              disabled={!isEdit}
                              className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                            />
                          </div>
                          {error.state && (
                            <p className="text-red-500 text-xs italic mt-1">
                              Please fill out this field.
                            </p>
                          )}
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
                              onChange={handleInputChange}
                              type="number"
                              name="zip"
                              id="zip"
                              value={editedUserData.address.zip}
                              disabled={!isEdit}
                              className="px-2 block w-full rounded-md border-0 py-1.5  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                            />
                          </div>
                          {error.zip && (
                            <p className="text-red-500 text-xs italic mt-1">
                              Please fill out this field.
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

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
