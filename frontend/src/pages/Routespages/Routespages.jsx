import style from './Routespages.module.css';
import { ReactComponent as FirstStar } from '../../components/Main/MainLocation/Location2/img/FirstStar.svg';
import { ReactComponent as ThirdStar } from '../../components/Main/MainLocation/Location2/img/ThirdStar.svg';
import { ReactComponent as Favorites } from '../../components/Main/MainLocation/Location2/img/Favorites.svg';
import { ReactComponent as Del } from './img/Del.svg';
import { ReactComponent as Plus } from './img/Plus.svg';
import { ReactComponent as Share } from '../../components/Main/MainLocation/Location2/img/Share.svg';
import Container from '../../components/Container/Container';
import Map from './img/map.jpg';

export const Routespages = () => {
  return (
    <Container>
      <div className={style.modal}>
        <div className={style.routes}>
          <h2 className={style.title}>Исторический Краснодар (пеший)</h2>
          <div className={style.raiting}>
            <div className={style.wrapper}>
              <p className={style.assesment}>Оценка</p>
              <p className={style.score}>4,9</p>
              <ul className={style.list}>
                <li className={style.star}>
                  <FirstStar width={38} height={38} />
                </li>
                <li className={style.star}>
                  <ThirdStar width={38} height={38} />
                </li>
                <li className={style.star}>
                  <ThirdStar width={38} height={38} />
                </li>
                <li className={style.star}>
                  <ThirdStar width={38} height={38} />
                </li>
                <li className={style.star}>
                  <ThirdStar width={38} height={38} />
                </li>
              </ul>
            </div>
            <div className={style.wrapper}>
              <Favorites className={style.favorites} />
              <Share />
              <p className={style.assesment}>Отзывы</p>
              <p className={style.score}>78</p>
            </div>
          </div>
        </div>
        <div className={style.mapWrapper}>
          <img src={Map} alt='Карта' className={style.map} />

          <div className={style.content}>
            <h3 className={style.contentTitle}>Описание маршрута</h3>
            <div className={style.category}>
              <span>Категория: </span>
              <p className={style.contentCategory}>исторический</p>
            </div>
            <div className={style.length}>
              <span>Протяженность: </span>
              <p className={style.contentLength}>4,3 км</p>
            </div>
            <div className={style.start}>
              <span>Старт от: </span>
              <p className={style.contentStart}>На Пушкинской площади</p>
            </div>

            <table className={style.resptab}>
              <tbody>
                <tr>
                  <td>Памятник Екатерине II</td>
                  <td className={style.svgWrapper}>
                    <Plus className={style.svg} />
                    <Del className={style.svg} />
                  </td>
                </tr>
                <tr>
                  <td>Памятник «Собачкина столица»</td>
                  <td className={style.svgWrapper}>
                    <Plus className={style.svg} />
                    <Del className={style.svg} />
                  </td>
                </tr>

                <tr>
                  <td>Фонтан «Старый Екатеринодар»</td>
                  <td className={style.svgWrapper}>
                    <Plus className={style.svg} />
                    <Del className={style.svg} />
                  </td>
                </tr>
                <tr>
                  <td>Театральная площадь</td>
                  <td className={style.svgWrapper}>
                    <Plus className={style.svg} />
                    <Del className={style.svg} />
                  </td>
                </tr>
                <tr>
                  <td>Памятник Шурику и Лидочке</td>
                  <td className={style.svgWrapper}>
                    <Plus className={style.svg} />
                    <Del className={style.svg} />
                  </td>
                </tr>
                <tr>
                  <td>Театральная площадь</td>
                  <td className={style.svgWrapper}>
                    <Plus className={style.svg} />
                    <Del className={style.svg} />
                  </td>
                </tr>
                <tr>
                  <td>Шуховская башня</td>
                  <td className={style.svgWrapper}>
                    <Plus className={style.svg} />
                    <Del className={style.svg} />
                  </td>
                </tr>
                <tr>
                  <td>Парк «Краснодар»</td>
                  <td className={style.svgWrapper}>
                    <Plus className={style.svg} />
                    <Del className={style.svg} />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className={style.start}>
              <span>Окончание маршрута: </span>
              <p className={style.contentStart}>На площади</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
