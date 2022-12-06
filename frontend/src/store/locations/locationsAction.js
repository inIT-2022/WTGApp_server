import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URI } from '../../assets/const';

export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  (_, { rejectWithValue }) => {
    return axios(`${API_URI}/locations`)
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);
