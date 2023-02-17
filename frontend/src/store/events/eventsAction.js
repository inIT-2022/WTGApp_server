import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URI } from '../../assets/const';
import { PAGE_SIZE } from '../../assets/const';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  (_, { rejectWithValue, getState }) => {
    const page = getState().events.currentPage;

    return axios(`${API_URI}/api/v1/events/after-now?page=${page}&${PAGE_SIZE}`)
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);

export const fetchSearchEvents = createAsyncThunk(
  'search/fetchSearchEvents',
  (_, { rejectWithValue, getState }) => {
    const page = getState().events.currentPage;
    const search = getState().search.searchValue;

    return axios(`
    ${API_URI}/api/v1/events/manual-title-description?manualTitle=${search}&page=${page}&${PAGE_SIZE}
    `)
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);
