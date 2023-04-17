import React from "react";
import SocketContext from "../../contexts/socketContext";
import { useSocket } from "../../hooks/useSocket";

export default function SocketProvider({ children }) {
  const socket = useSocket();
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
