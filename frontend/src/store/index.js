import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './reducers/channelSlice';
import messagesReducer from './reducers/messageSlice';

export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messagesReducer,
  },
});
