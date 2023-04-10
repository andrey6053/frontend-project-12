import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/reducers/messageSlice";
import socketContext from "../contexts/socketContext";

export function useAuthUser() {
  const [user, setUser] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const userName = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (userName && token) {
      setUser(userName);
      setIsAuth(true);
    }
  }, []);
  return { user, isAuth, setUser, setIsAuth };
}
