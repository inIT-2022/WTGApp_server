import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthData } from './authAction';

const initialState = {
  loading: false,
  data: {},
  // data: {
  //   login: 'User',
  //   email: 'ddd@mmm.ru',
  //   password: 'AAAaaa123',
  //   firstName: '',
  //   lastName: '',
  //   birthdayDate: '',
  //   userRoleString: '',
  // },
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: (state) => {
      state.data = [];
    },
    authregistration: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthData.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchAuthData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchAuthData.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { authLogout, authregistration } = authSlice.actions;

export default authSlice.reducer;
