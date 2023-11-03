import { createContext, useState } from "react";

export const ChatContext = createContext({
  chatId: null,
  setChatId: () => null,
});

export const ChatProvider = ({ children }) => {
  const [chatId, setChatId] = useState(null);
  const values = { chatId, setChatId };
  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};
