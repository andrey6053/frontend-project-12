import { useDispatch } from "react-redux";
import { addMessage } from "../store/reducers/messageSlice";
import {
  addChannel,
  removeChannel,
  renameChannel,
} from "../store/reducers/channelSlice";

export function useSocket(socket) {
  const dispatch = useDispatch();
  socket.removeAllListeners();
  socket.on("newMessage", (payload) => dispatch(addMessage(payload)));
  socket.on("newChannel", (payload) => dispatch(addChannel(payload)));
  socket.on("removeChannel", (payload) => dispatch(removeChannel(payload)));
  socket.on("renameChannel", (payload) =>
    dispatch(renameChannel({ id: payload.id, changes: payload }))
  );
  return socket;
}
