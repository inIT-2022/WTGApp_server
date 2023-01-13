import { Link } from 'react-router-dom';
import style from './CardMainLocation.module.css';
import noPhoto from '../../img/nophoto.jpg';

export const CardMainLocation = ({ loc }) => {
  return (
    <Link to={`locations/${loc.id}`} className={style.locWrap}>
      <img
        className={style.locImg}
        src={loc.linkImage ? loc.linkImage.split('|')[0] : noPhoto}
        alt={loc.title}
        width={278}
        height={330}
      />
      <p className={style.locTitle}>{loc.title}</p>
    </Link>
  );
};
