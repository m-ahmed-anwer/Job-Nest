import React, { useContext } from "react";
import { getAuth } from "firebase/auth";
import { UserContext } from "../../context/user-context";

const Message = ({ message }) => {
  const { currentUser } = useContext(UserContext)

  console.log(message);
  return (
    <div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={""} />
          </div>
        </div>
        <div className="chat-header">{currentUser.displayName}</div>
        <div className="chat-bubble">{message.text}</div>
      </div>
    </div>
  );
};

export default Message;
