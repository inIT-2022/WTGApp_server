import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URI } from '../../assets/const';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  (_, { rejectWithValue }) => {
    return axios(`${API_URI}/events`)
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);
