import { createSlice } from '@reduxjs/toolkit';
import { fetchSignupData } from './signupAction';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSignupData.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchSignupData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchSignupData.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default signupSlice.reducer;
