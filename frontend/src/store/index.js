import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './signup/signupSlice';
import authReducer from './auth/authSlice';
import searchReducer from './search/searchSlice';
import locationsReducer from './locations/locationsSlice';
import eventsReducer from './events/eventsSlice';

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    auth: authReducer,
    search: searchReducer,
    locations: locationsReducer,
    events: eventsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
