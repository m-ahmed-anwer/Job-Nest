import React, { useContext } from "react";

import { UserContext } from "../../context/user-context";

const RecievingMessage = ({ message }) => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <div className="chat-message">
        <div className="flex items-end">
          {currentUser && (
            <img
              src={message.receiver.photoURL}
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
          )}
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-500 text-white">
                {message.message}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecievingMessage;
