import React, { useContext, useEffect, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import {
  ArrowLeftIcon,
  PaperAirplaneIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import {
  getCompanyUserById,
  getMessage,
  getUsers,
  sendMessage,
} from "../../firebase/firebase";
import { UserContext } from "../../context/user-context";
import { useNavigate, useParams } from "react-router";

import SendingMessages from "./SendingMessages";
import RecievingMessage from "./RecievingMessage";
import { Link } from "react-router-dom";
import Loading from "../alert/loading";

const ChatBox = () => {
  const [value, setValue] = useState("");
  const { currentUser } = useContext(UserContext);
  const [chatId, setChatId] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allMessage, setAllMessages] = useState({ send: [], receive: [] });
  const navigate = useNavigate();
  const [usersCollection, setUsersCollection] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (chatId != null) {
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
      }

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

  useEffect(() => {
    const getUser = async () => {
      const users = await getUsers();
      setUsersCollection(users);
    };
    getUser();
  }, []);

  return (
    <>
      <div className="container mx-auto border border-black ">
        <div
          className="flex flex-row  justify-between  bg-white "
          style={{ height: 600 }}
        >
          <div className="flex flex-col bg-gray-50 ">
            <div
              className="flex flex-row pt-4 px-3 justify-center items-center"
              style={{ width: 400 }}
            >
              <div className="w-1/4 ">
                <img
                  src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                  className="object-cover  h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="flex">
                  <div className="text-lg text-blue-800 font-semibold">
                    Ahmed Anwer
                  </div>
                  <Link to={"/profile"}>
                    <PencilIcon className="h-5 mt-1  cursor-pointer " />
                  </Link>
                </div>

                <span class="text-gray-500 ">company</span>
              </div>
            </div>

            <div className="my-4 mt-10 px-5 ">
              <input
                type="text"
                placeholder=" 🔍  Search Users"
                className="py-2 px-2 border-2 h-10 border-black rounded-full w-full"
              />
            </div>

            <div className="overflow-y-auto border border-black">
              {usersCollection.length === 0 ? (
                <p className="my-5 mx-11">No companies registered yet.</p>
              ) : (
                usersCollection.map((index) => {
                  return (
                    <div className="flex flex-row py-4 px-3 justify-center items-center border-b">
                      <div className="w-1/4">
                        <img
                          src={index.photoURL}
                          className="object-cover h-12 w-12 rounded-full"
                          alt=""
                        />
                      </div>

                      <div
                        className="w-full  cursor-pointer"
                        onClick={() => setChatId(index.id)}
                      >
                        <div className="text-md font-semibold mx-5 text-blue-700">
                          {index.displayName}
                        </div>
                        <span class="text-gray-500 mx-5">{index.category}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {chatId != null ? (
            <div className="flex justify-between flex-col  mx-36 p-3 w-full">
              <Loading loading={isLoading} />
              <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                  <ArrowLeftIcon
                    className="h-6 mr-10 cursor-pointer"
                    onClick={() => {
                      setChatId(null);
                    }}
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
          ) : (
            <div className="flex justify-between flex-col  mx-36 p-3 w-full">
              Welcome to Job Nest Chat, Find the users from sidebar to connect
              with them
            </div>
          )}
        </div>
      </div>

      {/* <div className=" border border-gray-300  max-sm:mx-3 container mx-auto mb-10">
        <div className="flex justify-between flex-col  mx-36 p-3">
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
      </div> */}
    </>
  );
};

export default ChatBox;
