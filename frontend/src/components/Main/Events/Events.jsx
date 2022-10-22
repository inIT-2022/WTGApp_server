import { Line } from '../../Line/Line';
import style from './Events.module.css';
import EventsImg from './img/Events.jpg';

export const Events = () => (
  <div className={style.events} > 
    <img src={EventsImg} className={style.img} alt='События' />
    <div className={style.wrapper}>
      <h2 className={style.title}>главные события этой недели</h2>
      <p className={style.text}>все значимые события города и края</p>
    </div>
    <Line />
  </div>
);

