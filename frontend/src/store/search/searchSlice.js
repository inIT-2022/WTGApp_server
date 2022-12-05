import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchEvent: '',
  searchLocation: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchLocation: (state, action) => {
      state.searchLocation = action.payload;
    },
    setSearchEvent: (state, action) => {
      state.searchEvent = action.payload;
    },
    clearSearch: (state, action) => {
      state.searchEvent = '';
      state.searchLocation = '';
    },
  },
});

export const { setSearchLocation, setSearchEvent, clearSearch } =
  searchSlice.actions;

export default searchSlice.reducer;
