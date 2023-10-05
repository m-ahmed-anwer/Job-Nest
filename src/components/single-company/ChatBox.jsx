import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { serverTimestamp } from "firebase/firestore";
import {
  getCompanyUserById,
  getMessage,
  sendMessage,
} from "../../firebase/firebase";
import { UserContext } from "../../context/user-context";
import { useNavigate, useParams } from "react-router";

const ChatBox = () => {
  const [value, setValue] = useState("");
  const { currentUser } = useContext(UserContext);
  const { chatId } = useParams();
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Check if currentUser and email property exist before using them
      if (currentUser?.email) {
        setMessages(await getMessage(currentUser.email));
      }

      const list = await getCompanyUserById(chatId);
      setCompanies(list);
      setIsLoading(false);
    };

    fetchData();
  }, [value, currentUser, chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      return;
    }

    const data = {
      sender: {
        name: currentUser.displayName,
        photoURL: currentUser.photoURL,
        email: currentUser.email,
      },
      reciever: {
        name: companies.displayName,
        photoURL: companies.photoURL,
        email: companies.email,
      },
      message: value,
      flattenedTimestamp: serverTimestamp(),
    };
    setValue("");
    await sendMessage(data);
  };

  return (
    <div className=" border border-gray-300  max-sm:mx-3 container mx-auto mb-10">
      <div className="flex justify-between flex-col h-screen mx-36 p-3">
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            <ArrowLeftIcon
              className="h-7 mr-10 cursor-pointer"
              onClick={goBack}
            />
            <div className="relative">
              {companies && (
                <img
                  src={companies.photoURL}
                  alt=""
                  className="w-10 mr-5 sm:w-16 h-10 sm:h-16 rounded-full"
                />
              )}
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-700 mr-3">
                  {companies && companies.displayName}
                </span>
              </div>
              <span className="text-sm text-gray-600">Company</span>
            </div>
          </div>
        </div>
        <div
          id="messages"
          className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
          {Array.isArray(messages) ? (
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          ) : (
            <p>No messages available</p>
          )}

          {/** */}
          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                    Can be verified on any platform using docker
                  </span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile"
                className="w-6 h-6 rounded-full order-1"
              />
            </div>
          </div>
          {/** */}
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <form className="relative flex" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-400  text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0  sm:flex">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                <span className="font-bold">Send</span>
                <PaperAirplaneIcon className="h-6 w-6 ml-2 transform rotate-90" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
