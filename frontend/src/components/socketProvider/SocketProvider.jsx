import React from "react";
import SocketContext from "../../contexts/socketContext";
import { io } from "socket.io-client";
import { useSocket } from "../../hooks/useSocket";

export default function SocketProvider({ children }) {
  const socket = io();
  useSocket(socket);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
