import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: {},
  isModalShow: false,
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.isModalShow = true;
      state.modal = action.payload;
    },
    hideModal: (state) => {
      state.isModalShow = false;
      state.modal = {}
    },
  },
});

export const { showModal, hideModal } = uiSlice.actions;
export default uiSlice.reducer;
