import axios from 'axios';
import { useEffect, useState } from 'react';

import { API_URI } from '../assets/const';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios(
        `${API_URI}/api/v1/locations/get-locations-categories`,
        {},
      );
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return categories;
};
