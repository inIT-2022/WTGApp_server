import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchLocations,
  fetchSearchLocations,
} from '../../store/locations/locationsAction';

import Layout from '../../Layouts/Layout';
import Skeleton from '../../components/Skeleton/Skeleton';
import CardLocation from '../../components/CardLocation';
import BtnHome from '../../components/BtnHome';

import { setCurrentPage } from '../../store/locations/locationsSlice';
import { useObserver } from '../../hooks/useObserver';

import style from './Locations.module.css';

export const Locations = () => {
  const dispatch = useDispatch();

  const locations = useSelector((state) => state.locations.data);
  const loading = useSelector((state) => state.locations.loading);
  const error = useSelector((state) => state.locations.error);
  const countLocationsLastPage = useSelector(
    (state) => state.locations.countLocationsLastPage,
  );
  const searchValue = useSelector((state) => state.search.searchValue);
  const currentPage = useSelector((state) => state.locations.currentPage);

  const lastElement = React.useRef();

  useObserver(lastElement, countLocationsLastPage > 9, loading, () => {
    dispatch(setCurrentPage(currentPage + 1));
  });

  React.useEffect(() => {
    if (searchValue) {
      dispatch(fetchSearchLocations());
    } else dispatch(fetchLocations());
  }, [currentPage, searchValue]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={style.locations}>
      <Layout>
        <div className={style.nav}>
          <BtnHome />

          <h2 className={style.navText}>/ Топ локаций</h2>
        </div>
        {loading ? (
          <>
            {[...new Array(4)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </>
        ) : null}

        {locations.length > 0 ? (
          <>
            {locations.map((location) => (
              <CardLocation
                key={location.id}
                title={location.title}
                description={location.description}
                fullDescription={location.fullDescription}
                date={location.workTimeStart}
                source={location.linkSite}
                id={location.id}
                img={location.linkImage}
              />
            ))}
          </>
        ) : !error && !loading ? (
          <>
            <span>Ничего не найдено</span>
          </>
        ) : null}
        {error ? <h2>Упс, что-то пошло не так! Попробуйте позже...</h2> : null}

        <div style={{ height: 20 }} ref={lastElement}></div>
      </Layout>
    </section>
  );
};
