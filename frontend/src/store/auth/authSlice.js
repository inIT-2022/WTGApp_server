import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthData } from './authAction';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthData.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchAuthData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchAuthData.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
