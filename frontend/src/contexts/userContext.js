import { createContext } from "react";

export default createContext({
  user: "",
  isAuth: false,
  setUser: () => {},
  setIsAuth: () => {},
});
