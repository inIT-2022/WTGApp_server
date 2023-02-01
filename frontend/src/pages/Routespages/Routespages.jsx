import style from './Routespages.module.css';
import Cloud1 from './img/cloud1.png';
import Cloud2 from './img/cloud2.png';
import Cloud3 from './img/cloud3.png';
import Cloud4 from './img/cloud4.png';
import { Link } from 'react-router-dom';
import { Layout } from '../../Layouts/Layout/Layout';

{
  /* import { ReactComponent as FirstStar } from '../../components/Main/Location/Location2/img/FirstStar.svg';
import { ReactComponent as ThirdStar } from '../../components/Main/Location/Location2/img/ThirdStar.svg';
import { ReactComponent as Favorites } from '../../components/Main/Location/Location2/img/Favorites.svg';
import { ReactComponent as Del } from './img/Del.svg';
import Map from './img/map.jpg';
import { ReactComponent as Plus } from './img/Plus.svg';
import { ReactComponent as Share} from '../../components/Main/Location/Location2/img/Share.svg'; */
}

export const Routespages = () => {
  return (
    <section className={style.routespages}>
      <Layout>
        <div className={style.nav}>
          <Link to='/'>
            <svg
              width='36'
              height='36'
              viewBox='0 2 28 28'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M25.1475 9.52931L14.6475 2.52931C14.4558 2.40146 14.2304 2.33326 14 2.33331C13.7699 2.33349 13.5451 2.40168 13.3537 2.52931L2.85366 9.52931C2.6454 9.66818 2.48733 9.87034 2.40279 10.1059C2.31824 10.3415 2.31172 10.5981 2.38417 10.8377C2.45663 11.0773 2.60422 11.2872 2.80514 11.4365C3.00607 11.5858 3.24968 11.6665 3.49999 11.6666H4.66666V24.5C4.66666 24.8094 4.78957 25.1061 5.00837 25.3249C5.22716 25.5437 5.5239 25.6666 5.83332 25.6666H22.1667C22.4761 25.6666 22.7728 25.5437 22.9916 25.3249C23.2104 25.1061 23.3333 24.8094 23.3333 24.5V11.6666H24.5C24.7505 11.667 24.9945 11.5866 25.1958 11.4375C25.3971 11.2884 25.5451 11.0785 25.6178 10.8388C25.6906 10.5991 25.6842 10.3423 25.5997 10.1065C25.5152 9.87066 25.3571 9.66829 25.1487 9.52931H25.1475ZM21 23.3333H6.99999V9.56665L14 4.89998L21 9.56665V23.3333Z'
                fill='black'
              />
            </svg>
          </Link>
          <p> /</p>
        </div>
      </Layout>

      <div className={style.cloud}>
        <div className={style.cloudcontent}>Страница в разработке</div>
        <img src={Cloud1} alt='cloud' className={style.cloud1} />
        <img src={Cloud2} alt='cloud' className={style.cloud2} />
        <img src={Cloud3} alt='cloud' className={style.cloud3} />
        <img src={Cloud4} alt='cloud' className={style.cloud4} />
      </div>

      {/* <div className={style.modal}> 
          <div className={style.routes}>
            <h2 className={style.title}>Исторический Краснодар (пеший)</h2>
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
                <Share className={style.favorites1} />
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
        </div> */}
    </section>
  );
};
