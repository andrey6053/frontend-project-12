import { useDispatch } from "react-redux";
import { addMessage } from "../store/reducers/messageSlice";

export function useSocket(socket) {
  const dispatch = useDispatch();
  socket.removeAllListeners();
  socket.on("newMessage", (payload) => dispatch(addMessage(payload)));
  return socket;
}
