import { getData } from "../../actions/data";
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { addMessages } from "./messageSlice.js";

export const fetchData = createAsyncThunk("chat/fetchData", getData);

const channelAdapter = createEntityAdapter();
const initialState = channelAdapter.getInitialState({
  isLoader: false,
  error: null,
  currentChannelId: null,
});
const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setCurrentChannelId: (state,action) => {state.currentChannelId = action.payload}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoader = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, messages, currentChannelId } = action.payload;
        channelAdapter.addMany(state, channels);
        addMessages(messages);
        state.currentChannelId = currentChannelId;
        state.isLoader = false;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoader = false;
        state.error = action.error;
      });
  },
});

export const selectors = channelAdapter.getSelectors((state) => state.channels);
export const { setCurrentChannelId } = channelSlice.actions;
export default channelSlice.reducer;
