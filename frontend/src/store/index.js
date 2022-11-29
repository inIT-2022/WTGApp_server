import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './signup/signupSlice';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
