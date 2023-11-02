import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ChatContext } from "../../context/chat-context";
import { UserContext } from "../../context/user-context";

export default function Company({ item }) {
  const { displayName, email, photoURL, id } = item;
  const { currentUser } = useContext(UserContext);
  const { setChatId } = useContext(ChatContext);

  return (
    <div>
      {" "}
      <li className="border rounded-lg w-full">
        <div className="flex items-start justify-between p-4">
          <div className="space-y-2">
            <img
              alt="company"
              className="w-14 h-14 rounded-full border-gray-200 border-2 my-2"
              src={photoURL}
            />

            <h4 className="text-gray-800 font-semibold">{displayName}</h4>
            <p className="text-gray-600 text-sm">{email}</p>
          </div>

          <Link
            to={`/chat`}
            onClick={() => setChatId(id)}
            className="text-gray-700 text-sm border rounded-lg  px-3 py-2 duration-150 hover:bg-gray-100"
          >
            Connect
          </Link>
        </div>
        <div className="py-5 px-4 border-t text-right">
          <Link
            to={`/companies/${id}`}
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
          >
            View company
          </Link>
        </div>
      </li>
    </div>
  );
}
