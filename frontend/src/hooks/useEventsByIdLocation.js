import axios from 'axios';
import { useEffect, useState } from 'react';

import { API_URI } from '../assets/const';

export const useEventsByIdLocation = ({ id }) => {
  const [eventByIdData, setEventByIdData] = useState([]);

  useEffect(() => {
    const fetchEventsByIdLocation = async (id) => {
      const { data } = await axios(
        `${API_URI}/api/v1/events/event-by-location/${id}`,
      );
      setEventByIdData(data);
    };
    fetchEventsByIdLocation(id);
  }, [id]);

  return eventByIdData;
};
