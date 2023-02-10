import { useDispatch, useSelector } from 'react-redux';

import { setType } from '../../store/routes/routesSlice';

import style from './InputTypeRoute.module.css';

export const InputTypeRoute = () => {
  const dispatch = useDispatch();

  const type = useSelector((state) => state.routes.type);

  return (
    <div className={style.typeSelect}>
      <span className={style.text}>Тип маршрута:</span>
      <div className={style.btnsWrapper}>
        <button
          className={type === 'Walk' ? style.active : ''}
          onClick={() => dispatch(setType('Walk'))}
          type='button'
        >
          пеший
        </button>
        <button
          className={type === 'Bicycle' ? style.active : ''}
          onClick={() => dispatch(setType('Bicycle'))}
          type='button'
        >
          вело
        </button>
        <button
          className={type === 'Car' ? style.active : ''}
          onClick={() => dispatch(setType('Car'))}
          type='button'
        >
          авто
        </button>
      </div>
    </div>
  );
};
