import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URI, RADIUSES } from '../../assets/const';
import { getPointsForMap } from '../../utils/getPointsForMap';

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
  (data, { rejectWithValue, getState }) => {
    const type = getState().routes.type;
    const dataStore = getState().routes.route;
    const locationsByCategory = getState().routes.locationsByCategory;
    const mapScale = getState().routes.mapScale;

    const routeData = data ? data : dataStore;

    const lang = 'en_US';
    const ll = `${routeData.longitude},${routeData.latitude}`;
    const size = '540,360';
    const z = mapScale[type];

    const pt = getPointsForMap({ routeData, locationsByCategory });

    return fetch(
      `https://static-maps.yandex.ru/1.x/?lang=${lang}&ll=${ll}&size=${size}&z=${z}&l=map&pt=${pt}`,
    )
      .then((res) => res.url)
      .catch((err) => rejectWithValue(err));
  },
);

export const fetchRouteByLocation = createAsyncThunk(
  'route/fetchRouteByLocation',
  (_, { rejectWithValue, getState, dispatch }) => {
    const addressFromStore = getState().routes.location;
    const type = getState().routes.type;
    const radius = RADIUSES[type];
    const address = addressFromStore.toLowerCase().includes('краснодар')
      ? addressFromStore
      : addressFromStore + ' Краснодар';

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
export const fetchRouteByCategory = createAsyncThunk(
  'route/fetchRouteByCategory',
  (_, { rejectWithValue, getState, dispatch }) => {
    const type = getState().routes.type;
    const radius = RADIUSES[type];

    const addressFromStore = getState().routes.location;
    const address = addressFromStore.toLowerCase().includes('краснодар')
      ? addressFromStore
      : addressFromStore + ' Краснодар';

    const categories = getState().routes.category;

    return axios({
      method: 'post',
      url: `${API_URI}/api/v1/locations/by-categories-and-sector`,
      data: {
        radius,
        address,
        categories,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => rejectWithValue(err));
  },
);
