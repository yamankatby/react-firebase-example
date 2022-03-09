import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      setIsLoggedIn(!!user);
    });
  }, []);

  return isLoggedIn;
};
