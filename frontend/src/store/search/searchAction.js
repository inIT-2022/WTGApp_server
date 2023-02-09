import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URI } from '../../assets/const';

export const fetchSearchRoutes = createAsyncThunk(
  'search/fetchSearchRoutes',
  (search, { rejectWithValue }) => {
    const token = useSelector((state) => state.auth.data.token);
    if (!token) return;

    return axios(`${API_URI}/api/v1/routes/manualTitle?manualTitle=${search}`, {
      headers: {
        Authorization: token,
      },
    })
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);
