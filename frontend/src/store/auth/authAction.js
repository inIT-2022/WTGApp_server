import { API_URI } from '../../assets/const';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData',
  ({ login, password }, { rejectWithValue }) => {
    return axios({
      method: 'post',
      url: `${API_URI}/login`,
      data: { login, password },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);
