import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Modal from "../../components/alert/dialog-modal";
import { createAuthUserWithEmailAndPassword } from "../../firebase/firebase";
import Loading from "../../components/alert/loading";

const formFeild = {
  company: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
  password_confirmation: "",
  category: "",
};
const check = {
  company: true,
  first_name: true,
  last_name: true,
  email: true,
  phone: true,
  validPassword: true,
  confirmPassword: true,
  category: true,
};

function Sign() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState(formFeild);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(check);
  const [buttonMesage, setButtonMesage] = useState(null);

  const imageURL =
    "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const isValidPhoneNumber = (phone) => {
    return phone.length === 10 && phone.startsWith("07");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      first_name,
      last_name,
      email,
      phone,
      password,
      password_confirmation,
      category,
      company,
    } = data;

    if (category !== "company") {
      if (!first_name) {
        setError({ ...error, first_name: false });
        return;
      }
      if (!last_name) {
        setError({ ...error, last_name: false });
        return;
      }
    }

    if (category === "company" && !company) {
      setError({ ...error, company: false });
      return;
    }
    if (!isEmailValid(email)) {
      setError({ ...error, email: false });
      return;
    }
    if (category === "") {
      setError({ ...error, category: false });
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      setError({ ...error, phone: false });
      return;
    }
    if (password !== password_confirmation) {
      setError({ ...error, confirmPassword: false });
      return;
    }
    if (!isPasswordValid(password)) {
      setError({ ...error, validPassword: false });
      return;
    }

    setIsLoading(true);

    const displayName = () => {
      if (category === "company") {
        return company;
      } else {
        return first_name.trim() + " " + last_name.trim();
      }
    };

    const additional = {
      userPhone: phone,
      category: category,
      emailVerified: false,
      first_name: first_name,
      last_name: last_name,
      address: {
        country: "",
        street: "",
        city: "",
        state: "",
        zip: "",
      },
    };
    try {
      await createAuthUserWithEmailAndPassword(
        email,
        password,
        displayName(),
        imageURL,
        additional
      );

      setData(formFeild);
      setError(check);
      setIsLoading(false);
      navigate("/login", {
        state: { signupSuccess: true, forgetPassword: false },
      });
    } catch (error) {
      setIsLoading(false);
      setMessage(error.message);
      setOpen(true);
      setButtonMesage("Retry");
      setErrorMessage("error");
      setData({ ...data, password: "", password_confirmation: "" });
      setError(check);
    }
  };

  return (
    <section className="bg-white leading-4 tracking-normal relative">
      <Loading loading={isLoading} />
      <Modal
        message={message}
        open={open}
        setOpen={setOpen}
        error={errorMessage}
        buttonMessage={buttonMesage}
      />
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6  lg:pl-4/5 ">
          <img
            alt="Pattern"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Job Nest 💼
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Join Job Nest and Discover Your Dream Career Pathway 🚀
            </p>

            <form
              action="#"
              className="mt-8 my-10 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit}
            >
              <div
                className={`${
                  data.category === "company" ? "col-span-6" : "hidden"
                }`}
              >
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>

                <input
                  type="text"
                  id="company"
                  onChange={handleChange}
                  value={data.company}
                  placeholder="Google"
                  name="company"
                  className={`${
                    error.company ? "ring-gray-300" : "ring-red-500"
                  } tracking-wide block w-full rounded-md max-sm:h-10 border-0 py-1.5 px-2 text-gray-900  ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7 shadow-md`}
                />
                {!error.company && (
                  <p className="text-red-500 text-xs italic">
                    Please fill this field.
                  </p>
                )}
              </div>

              <div
                className={`${
                  data.category === "company"
                    ? "hidden"
                    : "col-span-6 sm:col-span-3"
                }`}
              >
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  onChange={handleChange}
                  value={data.first_name}
                  placeholder="Byron"
                  name="first_name"
                  className={`${
                    error.first_name ? "ring-gray-300" : "ring-red-500"
                  } tracking-wide block w-full rounded-md max-sm:h-10 border-0 py-1.5 px-2 text-gray-900  ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7 shadow-md`}
                />
                {!error.first_name && (
                  <p className="text-red-500 text-xs italic">
                    Please fill this field.
                  </p>
                )}
              </div>

              <div
                className={`${
                  data.category === "company"
                    ? "hidden"
                    : "col-span-6 sm:col-span-3"
                }`}
              >
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  placeholder="Keith"
                  onChange={handleChange}
                  value={data.last_name}
                  name="last_name"
                  className={`${
                    error.last_name ? "ring-gray-300" : "ring-red-500"
                  } tracking-wide block w-full rounded-md border-0 max-sm:h-10 py-1.5 px-2 text-gray-900  ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7 shadow-md`}
                />
                {!error.last_name && (
                  <p className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  placeholder="name@example.com"
                  className={`${
                    error.email ? "ring-gray-300" : "ring-red-500"
                  } tracking-wide block w-full rounded-md border-0 max-sm:h-10 py-1.5 px-2 text-gray-900  ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7 shadow-md`}
                />
                {!error.email && (
                  <p className="text-red-500 text-xs italic">Invalid E-mail.</p>
                )}
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="Phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  type="number"
                  id="Phone"
                  placeholder="0771234567"
                  onChange={handleChange}
                  value={data.phone}
                  name="phone"
                  className={`${
                    error.phone ? "ring-gray-300" : "ring-red-500"
                  } tracking-wide block w-full rounded-md border-0 py-1.5 px-2 max-sm:h-10 text-gray-900  ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7 shadow-md`}
                />
                {!error.phone && (
                  <p className="text-red-500 text-xs italic">
                    Incorrect Phone Number Format.
                  </p>
                )}
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="Phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  onChange={handleChange}
                  defaultValue={""} // Set the default value here
                  className={`${
                    error.category ? "ring-gray-300" : "ring-red-500"
                  } tracking-wide block w-full rounded-md border-0 py-1.5 px-2 max-sm:h-10 text-gray-900  ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7 shadow-md`}
                >
                  <option value={""}>Choose your category</option>{" "}
                  {/* Remove the 'selected' attribute */}
                  <option value="undergraduate">Undergraduate</option>
                  <option value="jobseeker">Job Seeker</option>
                  <option value="company">Company</option>
                  <option value="other">Other</option>
                </select>

                {!error.category && (
                  <p className="text-red-500 text-xs italic">
                    Select a category.
                  </p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3 relative">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    id="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    placeholder="*********"
                    className={`${
                      error.validPassword ? "ring-gray-300" : "ring-red-500"
                    } tracking-wide block w-full rounded-md border-0 py-1.5 px-2 max-sm:h-10 text-gray-900  ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7 shadow-md`}
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

                {!error.validPassword && (
                  <p className="text-red-500 text-xs italic">
                    Password need to contain atleat 6 characters.
                  </p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={`${showConfirmPassword ? "text" : "password"}`}
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    placeholder="*********"
                    onChange={handleChange}
                    value={data.password_confirmation}
                    className={`${
                      error.confirmPassword ? "ring-gray-300" : "ring-red-500"
                    } tracking-wide block w-full rounded-md border-0 py-1.5 px-2 text-gray-900  max-sm:h-10 ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7 shadow-md`}
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
                {!error.confirmPassword && (
                  <p className="text-red-500 text-xs italic">
                    Password Doesn't Match.
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our{" "}
                  <Link to={"/terms"} className="text-gray-700 underline">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to={"/privacy"} className="text-gray-700 underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  className="max-sm:w-full px-8 py-3 rounded-xl transition  max-sm:h-11 font-semibold shadow-md bg-blue-700 text-white hover:bg-blue-600"
                  type="submit"
                >
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?{" "}
                  <Link to={"/login"} className="text-gray-700 underline">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Sign;
