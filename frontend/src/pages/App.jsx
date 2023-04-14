import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page404 from "./page404/Page404";
import Login from "../pages/login/Login";
import Navbar from "../components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "../contexts/userContext";
import Chat from "./chat/Chat";
import { useAuthUser } from "../hooks/useAuthUser";
import SocketProvider from "../components/socketProvider/SocketProvider";
import ModalWindow from "../components/modal/Modal";
import Registration from "./registration/Registration";

function App() {
  const { user, isAuth, setUser, setIsAuth } = useAuthUser();
  return (
    <UserContext.Provider value={{ user, isAuth, setUser, setIsAuth }}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          {!isAuth ? (
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Registration />}></Route>
              <Route path="*" element={<Page404 />}></Route>
            </Routes>
          ) : (
            <SocketProvider>
              <Routes>
                <Route path="/" element={<Chat />}></Route>
                <Route path="*" element={<Chat />}></Route>
              </Routes>
              <ModalWindow />
            </SocketProvider>
          )}
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
