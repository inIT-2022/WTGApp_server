import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';

import { setCategory } from '../../store/routes/routesSlice';

import style from './InputCategories.module.css';

export const InputCategories = ({ errorCategory }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const categoryParams = params.category;

  const categories = useCategories();

  const handleChangeCategory = (e) => {
    const selectedCategoryTitle = categories.find(
      (obj) => obj.id === +e.target.value,
    ).title;
    dispatch(setCategory(selectedCategoryTitle));
  };

  return (
    <div className={style.category}>
      <span className={style.text}>Категория</span>
      <select
        className={style.select}
        defaultValue=''
        onChange={handleChangeCategory}
      >
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
  );
};
