import { Link } from 'react-router-dom';
import style from './CardMore.module.css';

export const CardMore = () => {
  return (
    <Link to='/locations' className={style.card}>
      <p className={style.text}>Смотреть </p>
      <p className={style.text}> все</p>
    </Link>
  );
};
