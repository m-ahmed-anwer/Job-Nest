import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getUserDocument } from "../firebase/firebase";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  databaseUser: null,
  setDatabaseUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [databaseUser, setDatabaseUser] = useState(null);
  const value = { currentUser, setCurrentUser, databaseUser, setDatabaseUser };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        if (user.emailVerified) {
          setCurrentUser(user);
          const userData = await getUserDocument(user);
          setDatabaseUser(userData);
        }
      } else {
        setCurrentUser(null);
        setDatabaseUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
