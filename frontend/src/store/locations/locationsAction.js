import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URI } from '../../assets/const';
import { pageSize } from '../../assets/const';

export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  (_, { rejectWithValue }) => {
    return axios(`${API_URI}/api/v1/locations?page=1&${pageSize}`)
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);
