import { createSlice } from '@reduxjs/toolkit';
import { fetchRoutes } from './routesAction';

const initialState = {
  loading: true,
  data: [],
  error: '',
};

export const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoutes.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchRoutes.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchRoutes.rejected, (state, action) => {
      state.data = [];
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export default routesSlice.reducer;
