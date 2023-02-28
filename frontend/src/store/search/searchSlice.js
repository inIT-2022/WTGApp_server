import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  isSearch: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setIsSearch: (state) => {
      state.isSearch = true;
    },
    clearSearch: (state) => {
      state.isSearch = false;
      state.searchLocations = [];
      state.searchValue = '';
    },
  },
});

export const { clearSearch, setSearchValue, setIsSearch } = searchSlice.actions;

export default searchSlice.reducer;
