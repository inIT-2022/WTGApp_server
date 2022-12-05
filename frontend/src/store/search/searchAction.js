import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URI } from '../../assets/const';

export const fetchSearchEvents = createAsyncThunk(
  'search/fetchSearchEvents',
  (search, { rejectWithValue }) => {
    return axios(`${API_URI}/events/manualTitle?manualTitle=${search}`)
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);

export const fetchSearchLocations = createAsyncThunk(
  'search/fetchSearchLocations',
  (search, { rejectWithValue }) => {
    return axios(`${API_URI}/locations/manualTitle?manualTitle=${search}`)
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);
