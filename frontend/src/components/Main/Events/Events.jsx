import style from './Events.module.css';
import EventsImg from '../../../img/mainEvent.png';

export const Events = () => (
  <>
    <img src={EventsImg} className={style.img} alt='События' />
    <div className={style.line}></div>
  </>
);
