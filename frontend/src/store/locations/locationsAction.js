import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URI } from '../../assets/const';
import { PAGE_SIZE } from '../../assets/const';

export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  (_, { rejectWithValue, getState }) => {
    const page = getState().locations.currentPage;
    return axios(`${API_URI}/api/v1/locations?page=${page}&${PAGE_SIZE}`)
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);

export const fetchSearchLocations = createAsyncThunk(
  'search/fetchSearchLocations',
  (search, { rejectWithValue }) => {
    return axios(
      `${API_URI}/api/v1/locations/manualTitle?manualTitle=${search}`,
    )
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);
