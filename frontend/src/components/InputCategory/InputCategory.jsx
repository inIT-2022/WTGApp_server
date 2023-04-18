import { useDispatch, useSelector } from 'react-redux';
import { CATEGORY } from '../../assets/const';
import { useCategories } from '../../hooks/useCategories';

import { setCategory } from '../../store/routes/routesSlice';

import style from './InputCategory.module.css';

export const InputCategory = ({ errorCategory }) => {
  const dispatch = useDispatch();

  // Получаем массив с id отмеченных категорий
  const category = useSelector((state) => state.routes.category);

  // Получаем список категорий с сервера
  const categories = useCategories();

  const handleChooseCategory = (e) => {
    dispatch(
      setCategory({
        value: +e.target.value,
        isChecked: e.target.checked,
      }),
    );
  };

  return (
    <div className={style.category}>
      <span className={style.text}>Категория:</span>
      <ul className={style.list}>
        {categories &&
          categories.map((obj) => (
            <li className={style.item} key={obj.id}>
              <input
                type='checkbox'
                id={obj.title}
                name={obj.title}
                value={obj.id}
                checked={!!category.find((item) => item === +obj.id)}
                onChange={handleChooseCategory}
              />
              <label htmlFor={obj.title}> {obj.title}</label>
            </li>
          ))}
      </ul>
      {errorCategory ? (
        <span className={style.errorCategory}>Выберите категорию!</span>
      ) : null}
    </div>
  );
};
