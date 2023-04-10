import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "./reducers/channelSlice.js";
import messagesReducer from "./reducers/messageSlice.js";
export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messagesReducer,
  },
});
