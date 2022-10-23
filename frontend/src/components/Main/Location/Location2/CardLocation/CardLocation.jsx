import style from './CardLocation.module.css';
import FotoLocation from '../img/FotoLocation.jpg';

export const CardLocation = () => (
    <>
      <div className={style.wrapper}>
          <div className={style.img}>
            <p className={style.distance}>Расстояние: 15,3 км</p>
            <img src={FotoLocation} width = {774} height = {564} alt='место события'></img>
          </div>
          <div className={style.content}> 
            <p className={style.address}>Россия, Краснодар, Центральный 
              внутригородской округ, микрорайон Центральный, Карасунская набережная</p>
            <a className={style.link} href="/">Источник</a>
            <div className={style.reviewsScope}>
              <p className={style.reviews}>Крутая скейт площадка!!!</p>
            </div>
            <p className={style.reviews}>График работы: не указан</p>
            <p className={style.reviews}>Возрастные ограничения: Без возрастных ограничений</p>
            <p className={style.reviews}>Цена: бесплатно </p>
          </div>
      </div>
    </>
  );
  