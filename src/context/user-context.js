import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getUserDocument } from "../firebase/firebase";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  databaseUser: null,
  setDatabaseUser: () => null,
  isLoading: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [databaseUser, setDatabaseUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const value = {
    currentUser,
    setCurrentUser,
    databaseUser,
    setDatabaseUser,
    isLoading,
  };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      setIsLoading(true);
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
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
