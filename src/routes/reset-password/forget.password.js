import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/alert/loading";
import Modal from "../../components/alert/dialog-modal";
import { forgetPassword } from "../../firebase/firebase";

const formFeild = {
  email: "",
};
const check = {
  email: true,
};

function ForgetPassword() {
  const [data, setData] = useState(formFeild);
  const [error, setError] = useState(check);
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const goBack = () => navigate(-1);

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!isEmailValid(data.email)) {
      setError({ email: false });
      return;
    }

    setIsLoading(true);

    try {
      await forgetPassword(data.email);

      setData(formFeild);
      setError(check);
      setIsLoading(false);
      navigate("/login", {
        state: { signupSuccess: false, forgetPassword: true },
      });
    } catch (error) {
      setIsLoading(false);
      setMessage(error.message);
      setOpen(true);

      setErrorMessage("error");
      setData(formFeild);
      setError(check);
    }
  };

  return (
    <div>
      <Loading loading={isLoading} />
      <Modal
        message={message}
        open={open}
        setOpen={setOpen}
        error={errorMessage}
        buttonMessage={"Retry"}
      />
      <div className="max-w-xl mx-auto my-24">
        <div className="flex flex-col items-center justify-center  p-4 space-y-4 antialiased text-gray-900 bg-gray-100">
          <div className="w-full px-8 max-w-lg space-y-6 bg-white rounded-md py-16">
            <h1 className=" mb-6 text-3xl font-bold text-center">
              Don't worry
            </h1>
            <p className="text-center mx-12">
              We are here to help you to recover your password. Enter the email
              address you used when you joined and we'll send you instructions
              to reset your password.
            </p>
            <form
              action="#"
              onSubmit={submitHandler}
              className="space-y-6 w-ful"
            >
              <input
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100"
                type="email"
                name="email"
                placeholder="Email address"
                onChange={handleChange}
                value={data.email}
              />
              {!error.email && (
                <p class="text-red-500 text-xs italic">Invalid email format.</p>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-medium text-center text-white bg-indigo-600 transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                >
                  Send
                </button>
              </div>
            </form>
            <button
              onClick={goBack}
              className="text-sm text-gray-600 items-center flex justify-between"
            >
              <p className="text-gray-800 cursor-pointer hover:text-blue-500 inline-flex items-center ml-4">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
