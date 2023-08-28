import React from "react";
import { Link } from "react-router-dom";

export default function Company({ item }) {
  const { displayName, email } = item;
  return (
    <div>
      {" "}
      <li className="border rounded-lg w-full">
        <div className="flex items-start justify-between p-4">
          <div className="space-y-2">
            {item.icon}
            <h4 className="text-gray-800 font-semibold">{displayName}</h4>
            <p className="text-gray-600 text-sm">{email}</p>
          </div>
          <button className="text-gray-700 text-sm border rounded-lg  px-3 py-2 duration-150 hover:bg-gray-100">
            Connect
          </button>
        </div>
        <div className="py-5 px-4 border-t text-right">
          <Link className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
            View company
          </Link>
        </div>
      </li>
    </div>
  );
}
