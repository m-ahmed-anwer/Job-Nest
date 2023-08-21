import React from "react";
import { Link } from "react-router-dom";
import image from "../../images/suitcase.png";

function Login() {
  return (
    <section class="bg-white">
      <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Pattern"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            class="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div class="max-w-xl lg:max-w-3xl">
            <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Job Nest 🎒
            </h1>

            <p class="mt-4 leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>

            <form action="#" class="mt-8 grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="FirstName"
                  class="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="LastName"
                  class="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                />
              </div>

              <div class="col-span-6">
                <label
                  for="Email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="Password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="PasswordConfirmation"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-md"
                />
              </div>

              <div class="col-span-6">
                <p class="text-sm text-gray-500">
                  By creating an account, you agree to our{" "}
                  <a href="#" class="text-gray-700 underline">
                    terms and conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" class="text-gray-700 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button class="   px-5 py-3 rounded-xl transition  font-semibold shadow-md bg-blue-700 text-white hover:bg-blue-600">
                  Create an account
                </button>

                <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?{" "}
                  <Link to={"/login"} class="text-gray-700 underline">
                    Log in
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Login;
