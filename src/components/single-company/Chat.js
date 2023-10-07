import React, { useContext, useEffect } from "react";
import ChatBox from "./ChatBox";
import { UserContext } from "../../context/user-context";
import { getCompanyUserById } from "../../firebase/firebase";
import { Navigate, useParams } from "react-router";

const Chat = () => {
  const { currentUser } = useContext(UserContext);
  const { chatId } = useParams();

  return (
    <div>
      {chatId === currentUser.uid ? (
        <Navigate to={"/companies"} />
      ) : (
        <>
          <div className=" max-w-5xl mx-auto  mt-10">
            <div className="flex flex-col items-center justify-center">
              {currentUser && (
                <h1 className="text-2xl  font-bold">
                  Hello, {currentUser.displayName} 👋🏻
                </h1>
              )}

              <p className="py-6">
                Feel free to ask any infromation we are there for 24/7
              </p>
            </div>
          </div>
          <ChatBox />
        </>
      )}
    </div>
  );
};

export default Chat;
