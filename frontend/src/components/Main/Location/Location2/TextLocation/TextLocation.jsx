import style from './TextLocation.module.css';
import { ReactComponent as FirstStar} from '../img/FirstStar.svg';
import { ReactComponent as ThirdStar} from '../img/ThirdStar.svg';
import { ReactComponent as Favorites} from '../img/Favorites.svg';
import { ReactComponent as Share} from '../img/Share.svg';
import { CardLocation } from '../CardLocation/CardLocation';
import Container from '../../../../Container/Container';

export const TextLocation = () => {
  return (
    <Container>
      <h2 className={style.title}>Скейт парк в парке Галицкого</h2>
      <div className={style.raiting}>
        <div className={style.wrapper}>
          <p className={style.assesment}>Оценка</p>
          <p className={style.score}>4,9</p>
          <ul className={style.list}>
          <li className={style.star}><FirstStar width={38} height={38}/></li>
          <li className={style.star}><ThirdStar width={38} height={38}/></li>
          <li className={style.star}><ThirdStar width={38} height={38}/></li>
          <li className={style.star}><ThirdStar width={38} height={38}/></li>
          <li className={style.star}><ThirdStar width={38} height={38}/></li>
        </ul>
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