import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_MAP_SCALES } from '../../assets/const';
import {
  fetchRouteByCategory,
  fetchRouteByLocation,
  fetchRouteMap,
  fetchRoutes,
} from './routesAction';

const initialState = {
  loading: true,
  data: [],
  location: '',
  type: '',
  category: [0, 0, 0, 0],
  route: null,
  locationsByCategory: null,
  routeMapLink: '',
  mapScale: DEFAULT_MAP_SCALES,
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
      if (!action.payload.isChecked) {
        state.category = state.category.map((item) =>
          item === action.payload.value ? 0 : item,
        );
      } else {
        const indexZero = state.category.findIndex((item) => item === 0);
        if (indexZero !== -1) {
          state.category = state.category.map((item, i) =>
            i === indexZero ? action.payload.value : item,
          );
        }
      }
    },
    resetCategory: (state) => {
      state.category = [0, 0, 0, 0];
    },
    deleteRoutePoint: (state, action) => {
      state.locationsByCategory = state.locationsByCategory.filter(
        (item) => item.id !== action.payload,
      );
    },

    changeScale: (state, action) => {
      state.mapScale = { ...state.mapScale, ...action.payload };
    },
    setDefaultScale: (state) => {
      state.mapScale = DEFAULT_MAP_SCALES;
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

    builder.addCase(fetchRouteByCategory.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchRouteByCategory.fulfilled, (state, action) => {
      state.locationsByCategory = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchRouteByCategory.rejected, (state, action) => {
      state.locationsByCategory = null;
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export const {
  setType,
  setLocation,
  setCategory,
  deleteRoutePoint,
  resetCategory,
  changeScale,
  setDefaultScale,
} = routesSlice.actions;

export default routesSlice.reducer;
