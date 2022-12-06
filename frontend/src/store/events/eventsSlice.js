import { createSlice } from '@reduxjs/toolkit';
import { fetchEvents } from './eventsAction';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default eventsSlice.reducer;
