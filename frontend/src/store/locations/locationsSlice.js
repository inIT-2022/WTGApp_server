import { createSlice } from '@reduxjs/toolkit';
import { fetchLocations } from './locationsAction';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchLocations.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default locationsSlice.reducer;
