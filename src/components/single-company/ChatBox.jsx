import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { UserContext } from "../../context/user-context";

const ChatBox = () => {
  const [value, setValue] = useState("");
  const { currentUser } = useContext(UserContext);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages.email"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe;
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      alert("Enter a valid Messages");
      return 0;
    }
    setValue("");
    try {
      await addDoc(collection(db, "messages"), {
        text: value,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
        createdAt: serverTimestamp(),
        email: currentUser.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[430px]">
      <div className="min-h-[430px]">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
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

export default ChatBox;
