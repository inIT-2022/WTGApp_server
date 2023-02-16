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

import style from './Locations.module.css';
import { setCurrentPage } from '../../store/locations/locationsSlice';
import { useObserver } from '../../hooks/useObserver';

export const Locations = () => {
  const dispatch = useDispatch();

  const locations = useSelector((state) => state.locations.data);
  const loading = useSelector((state) => state.locations.loading);

  const searchValue = useSelector((state) => state.search.searchValue);

  const lastElement = React.useRef();
  const currentPage = useSelector((state) => state.locations.currentPage);

  useObserver(lastElement, !searchValue, loading, () => {
    dispatch(setCurrentPage(currentPage + 1));
  });

  React.useEffect(() => {
    if (searchValue && locations) return;

    if (searchValue) {
      dispatch(fetchSearchLocations(searchValue));
    } else dispatch(fetchLocations());
  }, [currentPage]);

  return (
    <section className={style.locations}>
      <Layout>
        <div className={style.nav}>
          <BtnHome />

          <h2 className={style.navText}>/ Top locations</h2>
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
        ) : !loading ? (
          <>
            <span>Ничего не найдено</span>
          </>
        ) : null}
        <div style={{ height: 20 }} ref={lastElement}></div>
      </Layout>
    </section>
  );
};
