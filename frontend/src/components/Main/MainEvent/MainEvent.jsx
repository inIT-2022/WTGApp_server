import { Link } from 'react-router-dom';
import { Line } from '../../Line/Line';
import style from './MainEvent.module.css';
import EventsImg from './img/Events.jpg';

export const MainEvent = () => (
  <div className={style.events}>
    <Link to='/events'>
      <img src={EventsImg} className={style.img} alt='События' />
      <div className={style.wrapper}>
        <h2 className={style.title}>главные события этой недели</h2>
        <p className={style.text}>все значимые события города и края</p>
      </div>
      <Line />
    </Link>
  </div>
);
