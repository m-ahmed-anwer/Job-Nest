import React, { useContext } from "react";

import { UserContext } from "../../context/user-context";

const SendingMessages = ({ message }) => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <div className="chat-message">
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                {message.message}
              </span>
            </div>
          </div>
          {currentUser && (
            <img
              src={message.sender.photoURL}
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SendingMessages;
