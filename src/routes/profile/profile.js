import { Fragment, useState } from "react";
import MyProfile from "../../components/profile/myProfile";
import {
  ArrowRightOnRectangleIcon,
  Cog8ToothIcon,
  DocumentTextIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";

function Profile() {
  const tabItems = [
    {
      icon: <UserPlusIcon className="w-6 h-6" />,
      name: "My Profile",
      link: "",
    },
    {
      icon: <DocumentTextIcon className="w-6 h-6" />,
      name: "Manage Posts",
      link: "posts",
    },

    {
      icon: <Cog8ToothIcon className="w-6 h-6" />,
      name: "Settings",
      link: "settings",
    },
    {
      icon: <ArrowRightOnRectangleIcon className="w-6 h-6" />,
      name: "Log Out",
      link: "/",
    },
  ];
  const [selectedItem, setSelectedItem] = useState(0);
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="px-4 md:px-8 my-6">
        <ul
          role="tablist"
          className="max-w-screen-xl mx-auto border-b flex items-center gap-x-6 overflow-x-auto text-sm"
        >
          {tabItems.map((item, idx) => (
            <li
              key={idx}
              className={`py-2 border-b-2 ${
                selectedItem === idx
                  ? "border-indigo-600 text-indigo-600"
                  : "border-white text-gray-500"
              }`}
            >
              <button
                role="tab"
                aria-selected={selectedItem === idx ? true : false}
                aria-controls={`tabpanel-${idx + 1}`}
                className="flex items-center gap-x-2 py-2 px-2 rounded-lg duration-150 hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
                onClick={() => {
                  setSelectedItem(idx);
                  navigate(item.link);
                }}
              >
                {item.icon}
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Profile;
