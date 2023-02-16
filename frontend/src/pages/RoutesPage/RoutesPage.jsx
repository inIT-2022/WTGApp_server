import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../Layouts/Layout';
import Skeleton from '../../components/Skeleton/Skeleton';
import Spinner from '../../components/Spinner/Spinner';
import BtnHome from '../../components/BtnHome';

import { fetchRoutes } from '../../store/routes/routesAction';

import style from './RoutesPage.module.css';

export const RoutesPage = () => {
  const dispatch = useDispatch();

  const routes = useSelector((state) => state.routes.data);
  const loading = useSelector((state) => state.routes.loading);
  const loadingSearch = useSelector((state) => state.search.loading);

  const searchRoutes = useSelector((state) => state.search.searchRoutes);
  const searchValue = useSelector((state) => state.search.searchValue);

  const token = useSelector((state) => state.auth.data.token);

  React.useEffect(() => {
    dispatch(fetchRoutes());
  }, [token]);

  const filteredRoutes =
    searchRoutes?.length || searchValue ? searchRoutes : routes;

  return (
    <section className={style.locations}>
      <Layout>
        <div className={style.nav}>
          <BtnHome />

          <h2 className={style.navText}>/ Routes</h2>
        </div>
        {loading ? (
          <>
            {[...new Array(4)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </>
        ) : null}

        {filteredRoutes?.length > 0 ? (
          filteredRoutes.map((route) => <p key={route.id}>{route.title}</p>)
        ) : searchValue && loadingSearch ? (
          <Spinner />
        ) : token ? (
          <span>Ничего не найдено</span>
        ) : (
          <p className={style.authMessage}>Необходимо авторизоваться</p>
        )}
      </Layout>
    </section>
  );
};
