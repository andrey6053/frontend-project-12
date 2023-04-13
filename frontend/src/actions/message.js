export const socketEvent = (socket, data, type) => {
  try {
    socket.emit(type, data);
  } catch (e) {
    console.log(e);
  }
};
