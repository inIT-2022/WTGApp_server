import { Link } from 'react-router-dom';
import noPhoto from '../../img/nophoto.jpg';
import ReactMarkdown from 'react-markdown';

import style from './CardLocation.module.css';

export const CardLocation = ({
  source,
  description,
  fullDescription,
  id,
  date,
  title,
  img,
}) => {
  const shortSource = source ? source.slice(8)?.split('/')[0] : '';

  const imgLinks = img ? img.split('|') : [];
  return (
    <Link to={`${id}`} className={style.wrapper}>
      <div className={style.imgWrapper}>
        <img src={imgLinks.length ? imgLinks[0] : noPhoto} alt={title} />
      </div>
      <div className={style.content}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.date}>{date ? date.slice(0, 10) : ''}</p>
        <div className={style.descr}>
          <ReactMarkdown
            children={description ? description : fullDescription}
          />
        </div>
        <div className={style.source}>Источник: </div>
        <div className={style.sourceName}>{shortSource}</div>
      </div>
    </Link>
  );
};
