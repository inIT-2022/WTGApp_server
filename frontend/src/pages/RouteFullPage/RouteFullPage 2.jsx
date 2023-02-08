import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as Plus } from './img/Plus.svg';
import { ReactComponent as Del } from './img/Del.svg';
import BtnHome from '../../components/BtnHome';
import Layout from '../../Layouts/Layout';
import InputTypeRoute from '../../components/InputTypeRoute';
import InputAddress from '../../components/InputAddress';

import style from './RouteFullPage.module.css';
import { fetchRouteByLocation } from '../../store/routes/routesAction';
import { useParams } from 'react-router-dom';

export const RouteFullPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const typeParams = params.type;

  const address = useSelector((state) => state.routes.location);
  const category = useSelector((state) => state.routes.category);
  const type = useSelector((state) => state.routes.type);

  const routeData = useSelector((state) => state.routes.route);
  const mapSrc = useSelector((state) => state.routes.routeMapLink);

  useEffect(() => {
    !routeData && dispatch(fetchRouteByLocation(type || typeParams));
  }, []);

  return (
    <section className={style.route}>
      <Layout>
        <div className={style.nav}>
          <BtnHome />
          <h2 className={style.navText}>/ Routes / </h2>
        </div>

        <h2 className={style.title}>Исторический Краснодар</h2>

        <div className={style.wrapper}>
          <div className={style.interactiveContent}>
            <InputTypeRoute />
            <InputAddress />
            <div className={style.map}>
              <img src={mapSrc} alt='Карта' />
            </div>
          </div>

          <div className={style.content}>
            <h3 className={style.contentTitle}>О маршруте</h3>
            <div className={style.routeInfo}>
              <span className={style.category}>Категория:</span>
              <span className={style.categoryValue}>исторический</span>
              <span className={style.length}>Протяженность:</span>
              <span className={style.lengthValue}>
                <b>4,3</b> км
              </span>
            </div>

            <table className={style.resptab}>
              <tbody>
                <tr>
                  <td>Памятник Екатерине II</td>
                  <td className={style.svgWrapper}>
                    <Del className={style.svg} /> <Plus className={style.svg} />
                  </td>
                </tr>
                <tr>
                  <td>Памятник «Собачкина столица»</td>
                  <td className={style.svgWrapper}>
                    <Del className={style.svg} /> <Plus className={style.svg} />
                  </td>
                </tr>

                <tr>
                  <td>Фонтан «Старый Екатеринодар»</td>
                  <td className={style.svgWrapper}>
                    <Del className={style.svg} /> <Plus className={style.svg} />
                  </td>
                </tr>
                <tr>
                  <td>Театральная площадь</td>
                  <td className={style.svgWrapper}>
                    <Del className={style.svg} /> <Plus className={style.svg} />
                  </td>
                </tr>
                <tr>
                  <td>Памятник Шурику и Лидочке</td>
                  <td className={style.svgWrapper}>
                    <Del className={style.svg} /> <Plus className={style.svg} />
                  </td>
                </tr>
                <tr>
                  <td>Театральная площадь</td>
                  <td className={style.svgWrapper}>
                    <Del className={style.svg} /> <Plus className={style.svg} />
                  </td>
                </tr>
                <tr>
                  <td>Шуховская башня</td>
                  <td className={style.svgWrapper}>
                    <Del className={style.svg} /> <Plus className={style.svg} />
                  </td>
                </tr>
                <tr>
                  <td>Парк «Краснодар»</td>
                  <td className={style.svgWrapper}>
                    <Del className={style.svg} /> <Plus className={style.svg} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </section>
  );
};
