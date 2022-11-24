import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData',
  (_, { rejectWithValue }) => {
    const token = localStorage.getItem('bearer');

    if (!token) return;
    return axios(`https://api.unsplash.com/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);
