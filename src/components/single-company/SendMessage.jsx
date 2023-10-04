import React from "react";

const SendMessage = () => {
  return (
    <div className="h-screen relative max-w-5xl mx-auto lg:w-[64rem]">
      <button className="start absolute top-8 justify-start">Go back</button>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl mt-4 font-bold">Hello there 👋🏻</h1>
        <p className="py-6">
          Feel free to ask any infromation we are there for 24/7
        </p>
      </div>
    </div>
  );
};

export default SendMessage;
