export const sendMessage = async (socket, data) => {
  try {
    socket.emit("newMessage", data);
  } catch (e) {
    console.log(e);
  }
};
