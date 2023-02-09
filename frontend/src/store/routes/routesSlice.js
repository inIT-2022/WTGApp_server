import { createSlice } from '@reduxjs/toolkit';
import {
  fetchRouteByLocation,
  fetchRouteMap,
  fetchRoutes,
} from './routesAction';

const initialState = {
  loading: true,
  data: [],
  location: '',
  type: '',
  category: '',
  route: null,
  routeMapLink: '',
  error: '',
};

export const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    deleteRoutePoint: (state, action) => {
      state.route.locationDTOList = state.route.locationDTOList.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
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

    builder.addCase(fetchRouteByLocation.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchRouteByLocation.fulfilled, (state, action) => {
      state.route = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchRouteByLocation.rejected, (state, action) => {
      state.route = null;
      state.loading = true;
      state.error = action.payload;
    });

    builder.addCase(fetchRouteMap.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchRouteMap.fulfilled, (state, action) => {
      state.routeMapLink = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchRouteMap.rejected, (state, action) => {
      state.routeMapLink = '';
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export const { setType, setLocation, setCategory, deleteRoutePoint } =
  routesSlice.actions;

export default routesSlice.reducer;
