import { Link } from 'react-router-dom';
import style from './LocEventsCard.module.css';
import noPhoto from '../../img/nophoto.jpg';
export const LocEventsCard = ({ event }) => {
  const imgLink = event?.linkImage ? event.linkImage?.split('|')[0] : '';
  return (
    <Link to={`/events/${event.id}`} className={style.cardWrapper}>
      <img
        className={style.cardImage}
        src={imgLink ? imgLink : noPhoto}
        alt={event.title}
        width={150}
        height={100}
      />
    </Link>
  );
};
