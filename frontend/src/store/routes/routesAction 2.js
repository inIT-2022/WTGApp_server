import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URI, radiuses } from '../../assets/const';

export const fetchRoutes = createAsyncThunk(
  'routes/fetchRoutes',
  (_, { rejectWithValue, getState }) => {
    const token = getState().auth.data.token;
    if (!token) return;

    return axios(`${API_URI}/api/v1/routes`, {
      headers: {
        Authorization: token,
      },
    })
      .then(({ data }) => data)
      .catch((err) => rejectWithValue(err));
  },
);

export const fetchRouteMap = createAsyncThunk(
  'route/fetchRouteMap',
  (data, { rejectWithValue }) => {
    const lang = 'en_US';
    const ll = `${data.longitude},${data.latitude}`;
    const size = '540,360';
    const z = '15';
    const pt =
      '38.979463,45.044769,pm2rdl1~38.977756,45.045502,pm2rdl2~38.980415,45.044986,pm2rdl3';

    return fetch(
      `https://static-maps.yandex.ru/1.x/?lang=${lang}&ll=${ll}&size=${size}&z=${z}&l=map&pt=${pt}`,
    )
      .then((res) => res.url)
      .catch((err) => rejectWithValue(err));
  },
);

export const fetchRouteByLocation = createAsyncThunk(
  'route/fetchRouteByLocation',
  (type, { rejectWithValue, getState, dispatch }) => {
    const address = getState().routes.location;
    const radius = radiuses[type];

    return axios(
      `${API_URI}/api/v1/locations/locations-by-sector?radius=${radius}&address=${address}`,
      {},
    )
      .then(({ data }) => {
        dispatch(fetchRouteMap(data));
        return data;
      })
      .catch((err) => rejectWithValue(err));
  },
);
