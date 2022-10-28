import style from './Event.module.css';
import eventImg from '../../img/image 28.png';
import { Link } from 'react-router-dom';

export const Event = ({ source, description, id, date, title }) => {
  const shortSource = source.slice(8, 28);

  return (
    <Link to={`${id}`} className={style.wrapper}>
      <div className={style.imgWrapper}>
        <img
          className={style.img}
          src={eventImg}
          alt='изображение события'
          width={288}
          height={172}
        />
      </div>
      <div className={style.content}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.date}>{date.replace('T', ' ')}</p>
        <p className={style.descr}>{description}</p>
        <span className={style.source}>Источник: </span>
        <span className={style.sourceName}>{shortSource}</span>
      </div>
    </Link>
  );
};
