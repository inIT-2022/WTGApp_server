import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useCategories } from '../../hooks/useCategories';

import { fetchRouteByLocation } from '../../store/routes/routesAction';
import { setCategory } from '../../store/routes/routesSlice';

import InputAddress from '../InputAddress';
import InputTypeRoute from '../InputTypeRoute';

import style from './FormRoute.module.css';

export const FormRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const categoryParams = params.category;

  const [errorCategory, setErrorCategory] = useState(false);
  const [errorLocation, setErrorLocation] = useState(false);

  const location = useSelector((state) => state.routes.location);
  const category = useSelector((state) => state.routes.category);
  const type = useSelector((state) => state.routes.type);

  const categories = useCategories();

  const handleChangeCategory = (e) => {
    const selectedCategoryTitle = categories.find(
      (obj) => obj.id === +e.target.value,
    ).title;
    dispatch(setCategory(selectedCategoryTitle));
  };

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
      {errorLocation ? (
        <span className={style.errorLocation}>Выберите местоположение!</span>
      ) : null}
      <InputAddress />

      <InputTypeRoute />

      <div className={style.category}>
        <span className={style.text}>Категория</span>
        <select className={style.select} onChange={handleChangeCategory}>
          <option>
            {categories.length ? 'Выберите категоию' : 'Загрузка...'}
          </option>
          {categories.length
            ? categories.map((obj) => (
                <option
                  value={obj.id}
                  key={obj.id}
                  selected={obj.title === categoryParams ? true : false}
                >
                  {obj.title}
                </option>
              ))
            : null}
        </select>
        {errorCategory ? (
          <span className={style.errorCategory}>Выберите категорию!</span>
        ) : null}
      </div>

      <button className={style.btnSubmit} type='submit'>
        Подтвердить
      </button>
    </form>
  );
};
