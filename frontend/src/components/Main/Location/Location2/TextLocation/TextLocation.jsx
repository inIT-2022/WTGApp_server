import style from './TextLocation.module.css';
import { ReactComponent as Favorites } from '../img/Favorites.svg';
import { ReactComponent as Share } from '../img/Share.svg';
import { CardLocation } from '../CardLocation/CardLocation';
import Container from '../../../../Container/Container';
import { Raiting } from '../../../../Raiting/Raiting';

export const TextLocation = () => {
  return (
    <Container>
      <h2 className={style.title}>Скейт парк в парке Галицкого</h2>
      <div className={style.raiting}>
        <div className={style.wrapper}>
          <p className={style.assesment}>Оценка</p>
          <p className={style.score}>4,9</p>
          <Raiting />
        </div>
        <div className={style.wrapper}>
          <Favorites className={style.favorites} />
          <Share />
          <p className={style.assesment}>Отзывы</p>
          <p className={style.score}>999</p>
        </div>
      </div>
      <CardLocation />
    </Container>
  );
};
