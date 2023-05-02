import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BtnHome from '../../components/BtnHome';
import Layout from '../../Layouts/Layout';
import { ReactComponent as ZoomMinus } from './img/zoomMinus.svg';
import { ReactComponent as ZoomPlus } from './img/zoomPlus.svg';
import FormRoute from '../../components/FormRoute';
import RouteListItems from '../../components/RouteListItems';
import Modal from '../../components/Modal';

import {
  changeScale,
  setIsOpenModalSearchLocation,
  setType,
} from '../../store/routes/routesSlice';
import { resetLocations } from '../../store/locations/locationsSlice';

import { fetchRouteByCategory } from '../../store/routes/routesAction';
import { FormSearchRotesLocations } from '../../components/FormSearchRotesLocations/FormSearchRotesLocations';

import style from './RouteFullPage.module.css';

export const RouteFullPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const typeParams = params.type;

  const locationsByCategory = useSelector(
    (state) => state.routes.locationsByCategory,
  );

  const mapSrc = useSelector((state) => state.routes.routeMapLink);
  const scale = useSelector((state) => state.routes.mapScale[typeParams]);

  const ShowModal = useSelector(
    (state) => state.routes.isOpenModalSearchLocation,
  );

  const distance = locationsByCategory?.length
    ? (locationsByCategory.length * 0.7).toFixed(1)
    : 0;

  useEffect(() => {
    dispatch(setType(typeParams));
  }, []);

  const handleCloseModal = () => {
    dispatch(setIsOpenModalSearchLocation(false));
    dispatch(resetLocations());
  };

  const handleZoom = (isPlus) => {
    dispatch(
      changeScale({
        [typeParams]: Math.ceil(scale * (isPlus ? 1.1 : 0.9)),
      }),
    );
    dispatch(fetchRouteByCategory());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={style.route}>
      <Layout>
        <div className={style.nav}>
          <BtnHome />
          <h2 className={style.navText}>/ Маршруты / </h2>
        </div>

        <h2 className={style.title}>Краснодар</h2>

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
            {mapSrc ? (
              <div className={style.scaleWrapper}>
                <button
                  className={style.scaleButton}
                  onClick={() => handleZoom(false)}
                >
                  <ZoomMinus />
                </button>
                <button
                  className={style.scaleButton}
                  onClick={() => handleZoom(true)}
                >
                  <ZoomPlus />
                </button>
              </div>
            ) : null}
          </div>

          <div className={style.content}>
            <h3 className={style.contentTitle}>О маршруте</h3>
            {locationsByCategory && !locationsByCategory.length && (
              <p>Локаций согласно вашего маршрута не найдено</p>
            )}
            {mapSrc && (
              <div className={style.routeInfo}>
                <span className={style.length}>Протяженность:</span>
                <span className={style.lengthValue}>
                  <b>{distance}</b> км
                </span>
              </div>
            )}
            {mapSrc && <RouteListItems />}
          </div>
        </div>
        {ShowModal ? (
          <Modal
            active={ShowModal}
            closeModal={handleCloseModal}
            children={
              <FormSearchRotesLocations closeModal={handleCloseModal} />
            }
          />
        ) : null}
      </Layout>
    </section>
  );
};
