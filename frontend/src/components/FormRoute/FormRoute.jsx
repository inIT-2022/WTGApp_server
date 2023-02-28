import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  fetchRouteByCategory,
  fetchRouteByLocation,
} from '../../store/routes/routesAction';

import InputAddress from '../InputAddress';
import InputCategory from '../InputCategory';
import InputTypeRoute from '../InputTypeRoute';

import style from './FormRoute.module.css';

export const FormRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorCategory, setErrorCategory] = useState(false);
  const [errorLocation, setErrorLocation] = useState(false);

  const location = useSelector((state) => state.routes.location);
  const category = useSelector((state) => state.routes.category);
  const type = useSelector((state) => state.routes.type);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorCategory(false);
    setErrorLocation(false);

    if (category.every((item) => item === 0)) {
      setErrorCategory(true);
      return;
    }
    if (!location || !/^[а-я\s.]+?\d+/i.test(location)) {
      setErrorLocation(true);
      return;
    }

    const data = await dispatch(fetchRouteByCategory());
    console.log('data: ', data);

    if (data) {
      dispatch(fetchRouteByLocation());
      navigate(`/routes/${type}`);
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <InputAddress errorLocation={errorLocation} />

      <InputTypeRoute />

      <InputCategory errorCategory={errorCategory} />

      <button className={style.btnSubmit} type='submit'>
        Подтвердить
      </button>
    </form>
  );
};
