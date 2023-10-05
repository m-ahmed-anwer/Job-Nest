import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ChatBox from "./ChatBox";
import { Link, useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div>
      <div className="h-screen max-w-5xl mx-auto ">
        <ArrowLeftIcon
          className="h-7 sm:ml-11 sm:mt-8 mt-5 ml-3 cursor-pointer"
          onClick={goBack}
        />

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl  font-bold">Hello there 👋🏻</h1>
          <p className="py-6">
            Feel free to ask any infromation we are there for 24/7
          </p>
        </div>
      </div>
      <ChatBox />
    </div>
  );
};

export default Chat;
