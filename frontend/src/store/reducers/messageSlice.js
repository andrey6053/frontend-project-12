import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData } from './channelSlice';

const messageAdapter = createEntityAdapter();
const initialState = messageAdapter.getInitialState();
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messageAdapter.addOne,
    addMessages: messageAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { messages } = action.payload;
      messageAdapter.addMany(state, messages);
    });
  },
});

export const selectors = messageAdapter.getSelectors((state) => state.messages);
export const { addMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
