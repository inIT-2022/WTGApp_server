import { Link } from 'react-router-dom';
import style from './LocEventsCard.module.css';
import noPhoto from '../../img/nophoto.jpg';
export const LocEventsCard = ({ event }) => {
  console.log('event: ', event);

  const imgLink = event.location.linkImage
    ? event.location.linkImage.split('|')[0]
    : '';
  console.log('imgLink: ', imgLink);
  return (
    <Link to={`/events/${event.id}`} className={style.cardWrapper}>
      <img
        className={style.cardImage}
        src={imgLink ? imgLink : noPhoto}
        alt={event.title}
      />
    </Link>
  );
};
