import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLocations } from '../../store/locations/locationsAction';

import Layout from '../../Layouts/Layout';
import Skeleton from '../../components/Skeleton/Skeleton';
import CardLocation from '../../components/CardLocation';
import Spinner from '../../components/Spinner/Spinner';
import BtnHome from '../../components/BtnHome';

import style from './Locations.module.css';

export const Locations = () => {
  const dispatch = useDispatch();

  const locations = useSelector((state) => state.locations.data);
  const loading = useSelector((state) => state.locations.loading);
  const loadingSearch = useSelector((state) => state.search.loading);

  const searchLocations = useSelector((state) => state.search.searchLocations);
  const searchValue = useSelector((state) => state.search.searchValue);

  React.useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  const filteredLocations =
    searchLocations.length || searchValue ? searchLocations : locations;

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

        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
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
          ))
        ) : searchValue && loadingSearch ? (
          <Spinner />
        ) : (
          <>
            <span>Ничего не найдено</span>
          </>
        )}
      </Layout>
    </section>
  );
};
