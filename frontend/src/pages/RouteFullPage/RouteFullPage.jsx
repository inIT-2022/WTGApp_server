import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BtnHome from '../../components/BtnHome';
import Layout from '../../Layouts/Layout';

import FormRoute from '../../components/FormRoute';

import { setCategory, setType } from '../../store/routes/routesSlice';
import { RouteListItems } from '../../components/RouteListItems/RouteListItems';

import style from './RouteFullPage.module.css';

export const RouteFullPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const typeParams = params.type;
  const categoryParams = params.category;

  const routeData = useSelector((state) => state.routes.route);
  const mapSrc = useSelector((state) => state.routes.routeMapLink);

  const distance = routeData?.locationDTOList?.length
    ? (routeData.locationDTOList.length * 0.7).toFixed(1)
    : 0;

  useEffect(() => {
    dispatch(setType(typeParams));
    dispatch(setCategory(categoryParams));
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
            <FormRoute />
            <div className={style.map}>
              {mapSrc ? (
                <img src={mapSrc} alt='Карта' />
              ) : (
                <p className={style.message}>
                  Выберите параметры для получения маршрута
                </p>
              )}
            </div>
          </div>

          <div className={style.content}>
            <h3 className={style.contentTitle}>О маршруте</h3>
            <div className={style.routeInfo}>
              <span className={style.category}>Категория:</span>
              <span className={style.categoryValue}>исторический</span>
              <span className={style.length}>Протяженность:</span>
              <span className={style.lengthValue}>
                <b>{distance}</b> км
              </span>
            </div>
            <RouteListItems points={routeData?.locationDTOList} />
          </div>
        </div>
      </Layout>
    </section>
  );
};
