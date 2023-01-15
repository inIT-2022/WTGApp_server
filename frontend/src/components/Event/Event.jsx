import { Link } from 'react-router-dom';
import noPhoto from '../../img/nophoto.jpg';
import ReactMarkdown from 'react-markdown';

import style from './Event.module.css';

export const Event = ({ source, description, id, date, title, img }) => {
  const shortSource = source ? source.slice(8, 28) : '';

  const imgLinks = img ? img.split('|') : [];
  return (
    <Link to={`${id}`} className={style.wrapper}>
      <img
        className={style.img}
        src={imgLinks.length ? imgLinks[0] : noPhoto}
        alt='изображение события'
        width={288}
        height={172}
      />
      <div className={style.content}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.date}>{date ? date.slice(0, 10) : ''}</p>
        <p className={style.descr}>
          <ReactMarkdown children={description} />
        </p>
        <span className={style.source}>Источник: </span>
        <span className={style.sourceName}>{shortSource}</span>
      </div>
    </Link>
  );
};
