import style from './CardLocation.module.css';
import { Link } from 'react-router-dom';
import noPhoto from '../../img/nophoto.jpg';

export const CardLocation = ({ source, description, id, date, title, img }) => {
  const shortSource = source.slice(8, 28);

  const imgLinks = img.split('|');
  return (
    <Link to={`${id}`} className={style.wrapper}>
      <img
        className={style.img}
        src={imgLinks[0] ? imgLinks[0] : noPhoto}
        alt='изображение события'
        width={288}
        height={172}
      />
      <div className={style.content}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.date}>{date.slice(0, 10)}</p>
        <p className={style.descr}>{description}</p>
        <span className={style.source}>Источник: </span>
        <span className={style.sourceName}>{shortSource}</span>
      </div>
    </Link>
  );
};
