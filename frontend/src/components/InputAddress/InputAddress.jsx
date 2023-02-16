import { useDispatch, useSelector } from 'react-redux';

import { setLocation } from '../../store/routes/routesSlice';

import style from './InputAddress.module.css';

export const InputAddress = ({ errorLocation }) => {
  const dispatch = useDispatch();

  const location = useSelector((state) => state.routes.location);

  return (
    <div className={style.search}>
      {errorLocation ? (
        <span className={style.errorLocation}>Выберите местоположение!</span>
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

      <svg
        width='28'
        height='28'
        viewBox='0 0 28 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M21.79 22.8748L15.1225 16.2062C12.1564 18.3149 8.06932 17.7991 5.72016 15.0196C3.371 12.2401 3.54349 8.12419 6.11697 5.551C8.68978 2.97669 12.8061 2.80345 15.5861 5.15249C18.3661 7.50152 18.8822 11.589 16.7733 14.5553L23.4408 21.224L21.7911 22.8737L21.79 22.8748ZM11.066 5.83332C8.85363 5.83282 6.94495 7.38579 6.49553 9.55201C6.04611 11.7182 7.17947 13.9023 9.20943 14.7819C11.2394 15.6616 13.608 14.995 14.8813 13.1857C16.1545 11.3765 15.9824 8.92187 14.4691 7.308L15.175 8.008L14.3793 7.21467L14.3653 7.20067C13.4924 6.32237 12.3043 5.82998 11.066 5.83332Z'
          fill='#2E3A59'
        />
      </svg>
    </div>
  );
};
