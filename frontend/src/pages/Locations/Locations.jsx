import React from 'react';

import Layout from '../../Layouts/Layout';

import BtnHome from '../../components/BtnHome';

import style from './Locations.module.css';
import { LocationsList } from '../../components/LocationsList/LocationsList';

export const Locations = () => {
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
        <LocationsList />
      </Layout>
    </section>
  );
};
