import { createSlice } from '@reduxjs/toolkit';
import { fetchEvents, fetchSearchEvents } from './eventsAction';

const initialState = {
  loading: false,
  data: [],
  currentPage: 1,
  error: '',
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setCurrentPageEvent: (state, action) => {
      state.currentPage = action.payload;
    },
    resetEvents: (state) => {
      state.currentPage = 1;
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.data = [...state.data, ...action.payload].reduce(
        (arr, el) => (arr.find(({ id }) => el.id === id) || arr.push(el), arr),
        [],
      );
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchSearchEvents.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchSearchEvents.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchSearchEvents.rejected, (state, action) => {
      state.searchEvents = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setCurrentPageEvent, resetEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
