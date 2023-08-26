import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { auth, getUserDocument } from "../firebase/firebase";

export const UserDetailsContext = createContext({
  details: "",
  setDetails: () => {},
});

export const UserDetailsProvider = ({ children }) => {
  const [details, setDetails] = useState({});

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const check = async () => {
      if (currentUser) {
        const user = auth.currentUser;
        if (user) {
          const data = await getUserDocument(user);
          setDetails(data);
        }
      }
    };
    check();
  }, [currentUser]);

  const value = { details, setDetails };
  return (
    <UserDetailsContext.Provider value={value}>
      {children}
    </UserDetailsContext.Provider>
  );
};
