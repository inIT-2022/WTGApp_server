import { useDispatch, useSelector } from 'react-redux';

import { setLocation } from '../../store/routes/routesSlice';

import style from './InputAddress.module.css';

export const InputAddress = ({ errorLocation }) => {
  const dispatch = useDispatch();

  const location = useSelector((state) => state.routes.location);

  return (
    <div className={style.search}>
      {errorLocation ? (
        <span className={style.errorLocation}>
          Укажите название улицы и номер дома
        </span>
      ) : null}
      <input
        className={style.input}
        type='search'
        placeholder='укажите ваше местоположение'
        value={location}
        onChange={(e) => dispatch(setLocation(e.target.value))}
      />
      {location && (
        <button
          className={style.buttonClose}
          type='button'
          onClick={() => dispatch(setLocation(''))}
        >
          &#10008;
        </button>
      )}
    </div>
  );
};
