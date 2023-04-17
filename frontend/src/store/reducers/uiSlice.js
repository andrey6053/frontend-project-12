import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: {},
  isModalShow: false,
  idDropdown: null,
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
      state.modal = {};
    },
    setIdDropdown: (state, action) => {
      state.idDropdown = action.payload;
    },
  },
});

export const { showModal, hideModal,setIdDropdown } = uiSlice.actions;
export default uiSlice.reducer;
