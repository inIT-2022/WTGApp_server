import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchRouteByLocation } from '../../store/routes/routesAction';

import InputAddress from '../InputAddress';
import InputCategories from '../InputCategories';
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorCategory(false);
    setErrorLocation(false);

    if (!category) {
      setErrorCategory(true);
      return;
    }
    if (!location) {
      setErrorLocation(true);
      return;
    }
    dispatch(fetchRouteByLocation());
    navigate(`/routes/${type}/${category}`);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <InputAddress errorLocation={errorLocation} />

      <InputTypeRoute />

      <InputCategories errorCategory={errorCategory} />

      <button className={style.btnSubmit} type='submit'>
        Подтвердить
      </button>
    </form>
  );
};
