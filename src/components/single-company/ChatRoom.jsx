import React from "react";
import SendMessage from "./SendMessage";
import ChatBox from "./ChatBox";

const ChatRoom = () => {
  return (
    <div>
      <SendMessage />
      <ChatBox />
    </div>
  );
};

export default ChatRoom;
