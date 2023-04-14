import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getData } from "../../actions/data";
import { addMessages } from "./messageSlice";


export const fetchData = createAsyncThunk("chat/fetchData", getData);

const channelAdapter = createEntityAdapter();
const initialState = channelAdapter.getInitialState({
  isLoader: false,
  error: null,
  currentChannelId: null,
  ownerNewChannel:null
});
const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    setOwnerNewChannel: (state,action) => {
      state.ownerNewChannel = action.payload
    },
    addChannel: (state,action) => {
      channelAdapter.addOne(state,action.payload)
      const userName = localStorage.getItem("username")
      if (state.ownerNewChannel === userName) state.currentChannelId = action.payload.id
    },
    removeChannel: (state,action) => {
      const restEntities = Object.values(state.entities).filter((channel) => channel.id !== action.payload.id)
      channelAdapter.setAll(state,restEntities)
      state.currentChannelId = 1
    },
    renameChannel: channelAdapter.updateOne,
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
export const { setCurrentChannelId, addChannel, removeChannel, renameChannel,setOwnerNewChannel } =
  channelSlice.actions;
export default channelSlice.reducer;
