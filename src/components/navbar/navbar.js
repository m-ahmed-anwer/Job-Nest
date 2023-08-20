import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
//import { a } from "react-router-dom";

function Navbar() {
  const [profileView, setProfileView] = useState(false);
  const [menuBar, setMenuBar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  const data = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Jobs",
      link: "/jobs",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Service",
      link: "/service",
    },
  ];

  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"} class="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8 mr-3"
            alt="Job Nest Logo"
          />

          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Job Nest
          </span>
        </Link>
        <div class="flex items-center md:order-2">
          <button
            type="button"
            class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
            onClick={() => {
              setProfileView(!profileView);
            }}
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 rounded-full"
              src="https://img.freepik.com/free-icon/user-image-with-black-background_318-34564.jpg"
              alt="user photo"
            />
          </button>

          <div
            class={` ${
              profileView ? "block" : "hidden"
            } z-50  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
            id="user-dropdown"
          >
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">
                name@gmail.com
              </span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to={"/"}
                  class="hover:rounded-md block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  class="hover:rounded-md block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </Link>
              </li>
              <li>
                <p
                  class="hover:rounded-md block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={toggleDarkMode}
                >
                  Switch to {darkMode ? "Light Mode" : "Dark Mode"}
                </p>
              </li>
              <li>
                <Link
                  to={"/"}
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#e61923] hover:rounded-md hover:text-[#f7f7f7] dark:hover:bg-[#e61923] dark:text-[#f7f7f7] dark:hover:text-white"
                >
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
            onClick={() => {
              setMenuBar(!menuBar);
            }}
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          class={` ${
            menuBar ? "block" : "hidden"
          } justify-between  w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {data.map(({ link, title }) => {
              return (
                <li>
                  <Link
                    to={link}
                    className={`${
                      location.pathname === link
                        ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                        : "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    }`}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
