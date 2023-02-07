import { createSlice } from '@reduxjs/toolkit';
import { fetchLocations, fetchSearchLocations } from './locationsAction';

const initialState = {
  loading: true,
  data: [],
  currentPage: 1,
  error: '',
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetLocations: (state) => {
      state.currentPage = 1;
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.data = [...state.data, ...action.payload].reduce(
        (arr, el) => (arr.find(({ id }) => el.id === id) || arr.push(el), arr),
        [],
      );
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchLocations.rejected, (state, action) => {
      state.data = [];
      state.loading = true;
      state.error = action.payload;
    });

    builder.addCase(fetchSearchLocations.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchSearchLocations.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchSearchLocations.rejected, (state, action) => {
      state.data = [];
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export const { setCurrentPage, resetLocations } = locationsSlice.actions;
export default locationsSlice.reducer;
