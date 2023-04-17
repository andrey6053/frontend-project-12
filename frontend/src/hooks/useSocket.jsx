import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { addMessage } from "../store/reducers/messageSlice";
import {
  addChannel,
  removeChannel,
  renameChannel,
} from "../store/reducers/channelSlice";
import { toast } from "react-toastify";

export function useSocket() {
  const dispatch = useDispatch();
  const socket = io();
  socket.removeAllListeners();
  socket.on("connect_failed", () => toast.error("Ошибка соединения"));
  socket.on("error", () => toast.error("Ошибка соединения"));
  socket.on("reconnect_failed", () => toast.error("Ошибка соединения"));
  socket.on("disconnect", () => toast("Отключены от чата"));
  socket.on("newMessage", (payload) => dispatch(addMessage(payload)));
  socket.on("newChannel", (payload) => dispatch(addChannel(payload)));
  socket.on("removeChannel", (payload) => dispatch(removeChannel(payload)));
  socket.on("renameChannel", (payload) =>
    dispatch(renameChannel({ id: payload.id, changes: payload }))
  );
  return socket;
}
