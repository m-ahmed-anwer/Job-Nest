import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
  db,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../firebase/firebase";
import Modal from "../../components/alert/dialog-modal";
import Loading from "../../components/alert/loading";
import { UserContext } from "../../context/user-context";
import { doc, updateDoc } from "firebase/firestore";

const formFeild = {
  email: "",
  password: "",
};
const check = {
  email: true,
  validPassword: true,
  empty: true,
};

function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [buttonMesage, setButtonMesage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(formFeild);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCheck, setErrorCheck] = useState(check);
  const location = useLocation();
  const [rememberMe, setRememberMe] = useState(false);

  const { setCurrentUser } = useContext(UserContext);

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = data;

    if (data.email === "") {
      setErrorCheck({ ...errorCheck, empty: false });
      return;
    }

    if (!isEmailValid(data.email)) {
      setErrorCheck({ ...errorCheck, email: false });
      return;
    }
    if (!isPasswordValid(data.password)) {
      setErrorCheck({ ...errorCheck, validPassword: false });
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      if (!userCredential.user.emailVerified) {
        setIsLoading(false);
        setOpen(true);
        setMessage("Please verify your email before logging in.");
        setButtonMesage("OK");
        setErrorMessage("error");
        setData({ ...data, password: "" });
        return;
      }
      const userDocRef = doc(db, "users", userCredential.user.uid);

      try {
        await updateDoc(userDocRef, {
          emailVerified: true,
        });
      } catch (error) {
        console.error("Error updating email verification status:", error);
      }

      setCurrentUser(userCredential);
      setData(formFeild);
      setErrorCheck(check);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setOpen(true);
      setMessage(error.message); // Set the error message from the error object
      setButtonMesage("Retry");
      setErrorMessage("error"); // Set the error message for UI display
      setData({ ...data, password: "" });
      setErrorCheck(check);
    }
  };

  const googleLogin = async () => {
    setIsLoading(true);
    try {
      const { user } = await signInWithGooglePopup({
        userPhone: "",
        category: "",
        emailVerified: true,
        address: {
          country: "",
          street: "",
          city: "",
          state: "",
          zip: "",
        },
      });

      setCurrentUser(user);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const [loginOpen, setLoginOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    if (location.state) {
      const { signupSuccess: ss, forgetPassword: fp } = location.state;
      setLoginOpen(ss);
      setResetOpen(fp);
    }
  }, [location.state]);

  return (
    <section className="bg-white relative">
      {loginOpen && (
        <Modal
          message={
            "Congratulations! 🎉 Your account has been successfully created. Please verify your email."
          }
          open={loginOpen}
          setOpen={setLoginOpen}
          error={"success"}
          buttonMessage={"Continue"}
        />
      )}
      {resetOpen && (
        <Modal
          message={
            "Please check your email for instructions and kindly follow them to reset your password."
          }
          open={resetOpen}
          setOpen={setResetOpen}
          error={"success"}
          buttonMessage={"Continue"}
        />
      )}

      <Loading loading={isLoading} />
      <Modal
        message={message}
        open={open}
        setOpen={setOpen}
        error={errorMessage}
        buttonMessage={buttonMesage}
      />

      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 leading-4 tracking-normal">
        <aside className="relative block h-16 lg:order-first lg:col-span-5 lg:h-full xl:col-span-6 lg:w-4/5 ">
          <img
            alt="Pattern"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Job Nest 🎒
            </h1>
            <p className="mt-4 leading-relaxed text-gray-500">
              Unlock Your Future with Job Nest: Embark on Your Dream Career
              Journey 🚀
            </p>

            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit}
            >
              <div className="col-span-6 lg:col-span-5 ">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  onChange={handleChange}
                  value={data.email}
                  placeholder="name@example.com"
                  name="email"
                  className={`${
                    errorCheck.email ? "ring-gray-300" : "ring-red-500"
                  } tracking-wide block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 max-sm:h-11  ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7 shadow-md`}
                />
                {!errorCheck.email ? (
                  <p className="text-red-500 text-xs italic">
                    Incorrect e-mail format.
                  </p>
                ) : (
                  !errorCheck.empty && (
                    <p className="text-red-500 text-xs italic">Enter Email.</p>
                  )
                )}
              </div>

              <div className="col-span-6 lg:col-span-5 ">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="relative flex items-center">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    onChange={handleChange}
                    value={data.password}
                    placeholder="*********"
                    id="Password"
                    name="password"
                    className={`${
                      errorCheck.validPassword
                        ? "ring-gray-300"
                        : "ring-red-500"
                    } tracking-wide block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 max-sm:h-11  ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7 shadow-md`}
                  />

                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeIcon
                        className="h-4 w-4 cursor-pointer"
                        aria-hidden="true"
                      />
                    ) : (
                      <EyeSlashIcon
                        className="h-4 w-4 cursor-pointer"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </div>
                {!errorCheck.validPassword && (
                  <p className="text-red-500 text-xs italic">
                    Password need to contain atleat 6 characters.
                  </p>
                )}
              </div>

              <div className="col-span-5">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <label
                        className="block text-gray-500 font-bold"
                        htmlFor="remember"
                      >
                        <input
                          className="ml-2 leading-tight"
                          type="checkbox"
                          id="remember"
                          name="remember"
                          // onClick={() => setRememberMe(!rememberMe)}
                          // checked={rememberMe}
                        />
                        <span className="text-sm"> Remember me</span>
                      </label>
                    </div>
                    <div>
                      <Link
                        className="font-bold text-gray-700 text-sm underline"
                        to={"/forget-password"}
                      >
                        Forgot password
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  className="max-sm:w-full px-8 py-3 rounded-xl transition  font-semibold shadow-md bg-blue-700 text-white hover:bg-blue-600"
                  type="submit"
                >
                  Log In
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Don't have an account?{" "}
                  <Link to={"/signup"} className="text-gray-700 underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
            <div className="w-full flex items-center justify-between my-10 sm:my-8">
              <hr className="w-full bg-gray-400" />
              <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
                OR
              </p>
              <hr className="w-full bg-gray-400  " />
            </div>

            <button
              className="max-sm:w-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center "
              onClick={googleLogin}
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <p className="text-base font-medium ml-4 text-gray-700">
                Continue with Google
              </p>
            </button>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Login;
