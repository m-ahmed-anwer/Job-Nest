import {
  ArrowRightOnRectangleIcon,
  Bars3BottomRightIcon,
  Squares2X2Icon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailsContext } from "../../context/user-details";

export default function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let menuArray = [true, false, false];
  const [menu, setMenu] = useState(menuArray);
  const [show, setShow] = useState(false);

  const setMenuValue = (props) => {
    let newArr = [...menu];
    newArr[props] = !newArr[props];
    setMenu(newArr);
  };

  const { details } = useContext(UserDetailsContext);

  const {
    category,
    displayName,
    email,
    firstName,
    lastName,
    photoURL,
    userPhone,
  } = details;

  return (
    <div>
      <div className="rounded-r bg-gray-800 xl:hidden flex justify-between w-full p-6 items-center ">
        <div className="flex justify-between  items-center space-x-3">
          <p className="text-2xl leading-6 text-white">{displayName}</p>
        </div>
        <div aria-label="toggler" className="flex justify-center items-center">
          <button
            aria-label="open"
            id="open"
            onClick={() => setShow(true)}
            className={`${
              show ? "hidden" : ""
            } focus:outline-none focus:ring-2`}
          >
            <Bars3BottomRightIcon className="h-7 text-white" />
          </button>
          <button
            aria-label="close"
            id="close"
            onClick={() => setShow(false)}
            className={`${
              show ? "" : "hidden"
            } focus:outline-none focus:ring-2`}
          >
            <XMarkIcon className="h-7 text-white" />
          </button>
        </div>
      </div>
      <div
        id="Main"
        className={`${
          show ? "translate-x-0" : "-translate-x-full"
        } xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-gray-900 flex-col`}
      >
        <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
          <p className="text-2xl my-5 leading-6 text-white">{displayName}</p>
        </div>
        <div className="mt-5 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b  space-y-3 pb-11 ">
          <button className="my-3 flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-indigo-400 hover:bg-  rounded ">
            <Squares2X2Icon className="h-6" />
            <p className="text-base leading-4 ">Dashboard</p>
          </button>
          <button className="my-3 flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded ">
            <UserIcon className="h-6" />
            <p className="text-base leading-4 ">My Profile</p>
          </button>
          <button className="my-3 flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded ">
            <UserIcon className="h-6" />
            <p className="text-base leading-4 ">Manage Posts</p>
          </button>
          <button className="my-3 flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-white focus:text-indigo-400   rounded ">
            <ArrowRightOnRectangleIcon className="h-6" />
            <p className="text-base leading-4 ">Sign Out</p>
          </button>
        </div>

        <div className="flex flex-col justify-between items-center h-full pb-6   px-6 mt-60  w-full  space-y-32 ">
          <div className=" flex justify-between items-center w-full">
            <div className="justify-center items-center ">
              <div>
                <img
                  className="rounded-full h-11"
                  src={photoURL}
                  alt="avatar"
                />
              </div>
              <div className="flex justify-start flex-col items-start mt-4">
                <p className="cursor-pointer text-sm leading-5 text-white">
                  {displayName}
                </p>
                <p className="cursor-pointer text-xs leading-3 text-gray-300">
                  {email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
