import axios from 'axios';
import { useEffect, useState } from 'react';

import { API_URI } from '../assets/const';

export const useFullPageById = ({ id, page }) => {
  const [eventPageData, setEventPageData] = useState([]);

  useEffect(() => {
    const fetchEventPage = async (id) => {
      const { data } = await axios(`${API_URI}/api/v1/${page}/${id}`);
      setEventPageData(data);
    };
    fetchEventPage(id);
  }, [id, page]);

  return eventPageData;
};
