import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { createUserDocumentFromAuth } from "../firebase/firebase";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);
        // Check if user's email is verified before setting the currentUser state
        if (user.emailVerified) {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
