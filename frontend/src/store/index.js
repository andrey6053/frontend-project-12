import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "./reducers/channelSlice";
import messagesReducer from "./reducers/messageSlice";
import uiSlice from "./reducers/uiSlice";

export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messagesReducer,
    ui: uiSlice,
  },
});
