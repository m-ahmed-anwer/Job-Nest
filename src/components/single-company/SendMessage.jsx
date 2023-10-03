import React, { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import { UserContext } from "../../context/user-context";

const SendMessage = () => {
  const [value, setValue] = useState("");
  const { currentUser } = useContext(UserContext);
  const uid = auth.currentUser.uid;

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      alert("Enter a valid Messages");
      return 0;
    }

    try {
      await addDoc(collection(db, "messages"), {
        text: value,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
    } catch (error) {
      console.log(error);
    }
    setValue("");
  };

  return (
    <div className="h-screen relative max-w-5xl mx-auto lg:w-[64rem]">
      <button className="start absolute top-8 justify-start">Go back</button>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl mt-4 font-bold">Hello there 👋🏻</h1>
        <p className="py-6">
          Feel free to ask any infromation we are there for 24/7
        </p>
      </div>
      <div>
        <form onSubmit={handleSendMessage} className="flex">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="input flex-1 focus:outline-none bg-gray-100"
            type="text"
          />
          <button
            type="submit"
            className="bg-gray-500 text-white px-5 text-sm rounded-lg w-28"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;
