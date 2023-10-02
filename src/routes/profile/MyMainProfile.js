import { Fragment, useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  Cog8ToothIcon,
  DocumentTextIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";
import Modal from "../../components/alert/dialog-modal";
import MyProfile from "../../components/profile/myProfile";

function MainProfile() {
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
  ];
  const [selectedItem, setSelectedItem] = useState(0);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleSignOut = () => {
    setOpen(true);
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
          <li className={`py-2 border-b-2 border-white text-gray-500 `}>
            <button
              className="flex items-center gap-x-2 py-2 px-2 rounded-lg duration-150 hover:text-red-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
              onClick={handleSignOut}
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
              Log Out
            </button>
          </li>
        </ul>
      </div>

      <Outlet />
    </Fragment>
  );
}

export default MainProfile;
