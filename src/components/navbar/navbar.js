import React, { Fragment, useContext, useEffect, useState } from "react";
import image from "../../images/suitcase.png";
import { Menu, Transition } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";

import { UserContext } from "../../context/user-context";
import Modal from "../alert/dialog-modal";

import { auth } from "../../firebase/firebase";
import { Bars3Icon } from "@heroicons/react/24/outline";

function Navbar() {
  const { currentUser, databaseUser } = useContext(UserContext);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
      setImageURL(user.photoURL);
    }
  }, [databaseUser]);

  const [profileView, setProfileView] = useState(false);
  const [menuBar, setMenuBar] = useState(false);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    setOpen(true);
  };

  const data = [
    {
      id: 1,
      title: "Home",
      link: "/",
    },
    {
      id: 2,
      title: "Jobs",
      link: "/jobs",
    },
    {
      id: 3,
      title: "Companies",
      link: "/companies",
    },
    ...(databaseUser && databaseUser.category === "company"
      ? [
          {
            id: 4,
            title: "Post Job",
            link: "/post",
          },
        ]
      : []),
    ...(databaseUser
      ? [
          {
            id: 5,
            title: "Chat",
            link: `/chat`,
          },
        ]
      : []),
  ];

  const close = () => {
    setMenuBar(false);
  };
  return (
    <Fragment>
      <Modal
        message={"Do you want to sign out"}
        open={open}
        setOpen={setOpen}
        error={"error"}
        buttonMessage={"Sign Out"}
        confirm={"signout"}
      />

      <nav
        className="  border-gray-200 dark:bg-gray-900 py-3 px-2 rounded-b-3xl "
        style={{
          background:
            "linear-gradient(0deg, rgba(246,251,255,1) 0%, rgba(230,230,230,1) 100%)",
        }}
      >
        <div className="backdrop-blur-sm max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={"/"} className="flex items-center" onClick={close}>
            <img src={image} className="h-8 mr-3" alt="Job Nest Logo" />

            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Job Nest
            </span>
          </Link>

          <div className="flex items-center justify-center md:order-2">
            {currentUser ? (
              <div className=" relative flex items-center md:order-2 z-50">
                <Menu
                  as="div"
                  className="relative inline-block text-left z-50 "
                >
                  <Menu.Button
                    type="button"
                    className="w-8 h-8 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 ring-2 ring-gray-300 focus:ring-4 hover:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={() => {
                      setProfileView(!profileView);
                    }}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={imageURL}
                      alt="ProfilePic"
                    />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      className="absolute right-0 z-50 mt-2 w-[240px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      onClick={close}
                    >
                      <div className="p-2 z-50">
                        <div className="px-4 py-3">
                          <span className="block text-md my-1 text-black dark:text-white">
                            {displayName}
                          </span>
                          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                            {email}
                          </span>
                        </div>

                        <Menu.Item>
                          <Link
                            to={"/profile"}
                            onClick={close}
                            className="hover:rounded-md block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            My Profile
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            to={"/profile/settings"}
                            onClick={close}
                            className="hover:rounded-md block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Settings
                          </Link>
                        </Menu.Item>

                        <Menu.Item>
                          <div
                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-[#e61923] hover:rounded-md hover:text-[#f7f7f7] dark:hover:bg-[#e61923] dark:text-[#f7f7f7] dark:hover:text-white"
                            onClick={handleSignOut}
                          >
                            Sign out
                          </div>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <div className="flex items-center justify-center md:order-2">
                <div className=" w-fit rounded-xl m-1 mr-3 ">
                  <Link
                    onClick={close}
                    to={"/login"}
                    className={`${
                      location.pathname !== "/login" && "hover:bg-gray-50"
                    }  ${
                      location.pathname === "/login" &&
                      "bg-blue-700 text-white dark:bg-blue-700 dark:text-white hover:bg-blue-600"
                    } dark:bg-gray-700 dark:hover:bg-blue-500 dark:text-white px-5 py-3 max-sm:px-3 max-sm:py-3 rounded-l-xl transition  font-semibold shadow-md`}
                  >
                    Log In
                  </Link>
                  <Link
                    onClick={close}
                    to={"/signup"}
                    className={`${
                      location.pathname === "/login" && "hover:bg-gray-50"
                    } 
                  ${
                    location.pathname !== "/login" &&
                    "bg-blue-700 text-white dark:bg-blue-700 dark:text-white hover:bg-blue-600"
                  } dark:bg-gray-700 dark:hover:bg-blue-500 dark:text-white px-5 py-3 rounded-r-xl max-sm:px-3 max-sm:py-3  transition  font-semibold shadow-md`}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
              onClick={() => {
                setMenuBar(!menuBar);
              }}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="w-11 h-11 text-black " />
            </button>
          </div>
          <div
            className={` ${
              menuBar ? "block" : "hidden"
            } justify-between  w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 max-md:bg-white ">
              {data.map(({ link, title, id }) => {
                return (
                  <div key={id}>
                    <li>
                      <Link
                        to={link}
                        onClick={close}
                        className={`${
                          location.pathname === link
                            ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                            : "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        }`}
                      >
                        {title}
                      </Link>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;
