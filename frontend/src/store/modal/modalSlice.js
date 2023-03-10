import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShowModal: false,
  isShowRegistration: false,
  isShowLogin: true,
  isAgreePolicy: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsShowModal: (state, action) => {
      state.isShowModal = action.payload;
      if (!action.payload) {
        state.isAgreePolicy = false;
      }
    },
    setIsShowRegistration: (state, action) => {
      state.isShowRegistration = action.payload;
      state.isShowLogin = !action.payload;
    },

    setIsAgreePolicy: (state, action) => {
      state.isAgreePolicy = action.payload;
    },
  },
});

export const { setIsShowModal, setIsShowRegistration, setIsAgreePolicy } =
  modalSlice.actions;

export default modalSlice.reducer;
