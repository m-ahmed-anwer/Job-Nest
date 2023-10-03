import React from "react";
import SendMessage from "./SendMessage";
import ChatBox from "./ChatBox";

const ChatRoom = () => {
  return (
    <div>
      <ChatBox />
      <SendMessage />
    </div>
  );
};

export default ChatRoom;
