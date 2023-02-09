import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URI, radiuses } from '../../assets/const';
import { getPointsForMap } from '../../utils/getPointsForMap';

export const fetchRoutes = createAsyncThunk(
  'routes/fetchRoutes',
  (_, { rejectWithValue }) => {
    const token = window.localStorage.getItem('token');
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
  (data, { rejectWithValue, getState }) => {
    const type = getState().routes.type;
    const dataStore = getState().routes.route;

    const routeData = data ? data : dataStore;

    const lang = 'en_US';
    const ll = `${routeData.longitude},${routeData.latitude}`;
    const size = '540,360';
    const z = type === 'Car' ? '15' : type === 'Bicycle' ? '16' : '17';
    const pt = getPointsForMap(routeData.locationDTOList);

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
