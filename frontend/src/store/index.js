import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './signup/signupSlice';
import authReducer from './auth/authSlice';
import searchReducer from './search/searchSlice';
import locationsReducer from './locations/locationsSlice';
import eventsReducer from './events/eventsSlice';
import routesReducer from './routes/routesSlice';

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    auth: authReducer,
    search: searchReducer,
    events: eventsReducer,
    locations: locationsReducer,
    routes: routesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
