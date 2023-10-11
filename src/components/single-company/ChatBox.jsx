import React, { useContext, useEffect, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
  getCompanyUserById,
  getMessage,
  sendMessage,
} from "../../firebase/firebase";
import { UserContext } from "../../context/user-context";
import { useNavigate, useParams } from "react-router";

import SendingMessages from "./SendingMessages";
import RecievingMessage from "./RecievingMessage";

const ChatBox = () => {
  const [value, setValue] = useState("");
  const { currentUser } = useContext(UserContext);
  const { chatId } = useParams();
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allMessage, setAllMessages] = useState({ send: [], receive: [] });
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const list = await getCompanyUserById(chatId);

      if (currentUser?.email) {
        const sendMSG = await getMessage(currentUser.email, list.email);
        setAllMessages((prevMessages) => ({
          ...prevMessages,
          send: sendMSG,
        }));
      }

      const receiveMSG = await getMessage(list.email, currentUser.email);
      setAllMessages((prevMessages) => ({
        ...prevMessages,
        receive: receiveMSG,
      }));

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
      receiver: {
        name: companies.displayName,
        photoURL: companies.photoURL,
        email: companies.email,
      },
      message: value,
      createdAt: serverTimestamp(),
    };
    setValue("");
    await sendMessage(data);

    const messagesContainer = document.getElementById("messages");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  return (
    <>
      <div className=" border border-gray-300  max-sm:mx-3 container mx-auto mb-10">
        <div className="flex justify-between flex-col  mx-36 p-3">
          {/* {isLoading ? (<Loading loading={isLoading} />) : (<>
            </>)} */}
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div className="relative flex items-center space-x-4">
              <ArrowLeftIcon
                className="h-6 mr-10 cursor-pointer"
                onClick={goBack}
              />
              <div className="relative">
                {companies && (
                  <img src={companies.photoURL} alt="" className="w-16 " />
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
            className=" flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            style={{ height: 500 }}
          >
            {Array.isArray(allMessage.send) &&
              Array.isArray(allMessage.receive) &&
              [...allMessage.send, ...allMessage.receive]
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((message) =>
                  message.sender.email === currentUser.email ? (
                    <SendingMessages key={message.id} message={message} />
                  ) : (
                    <RecievingMessage key={message.id} message={message} />
                  )
                )}
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
                  className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                >
                  <span className="font-bold">Send</span>
                  <PaperAirplaneIcon className="h-6 w-6 ml-2 transform rotate-90" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
