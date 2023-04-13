import { useEffect, useState } from "react";

export function useAuthUser() {
  const [user, setUser] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const userName = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (userName && token) {
      setUser(userName);
      setIsAuth(true);
    }
  }, []);
  return {user,isAuth,setUser,setIsAuth};
}
