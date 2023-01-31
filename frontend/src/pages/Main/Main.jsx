import React from 'react';
import style from './Main.module.css';
// import EventSelection from '../../components/Main/EventSelection';
import MainEvent from '../../components/Main/MainEvent';
import Navigation from '../../components/Main/Navigation';
import { Layout } from '../../Layouts/Layout/Layout';
import MainLocation from '../../components/Main/MainLocation';
import MainRoutes from '../../components/Main/MainRoutes';
// import Recreation from '../../components/Main/Recreation';
import { ScrollTop } from '../../components/ScrollTop/ScrollTop';

const Main = ({ searchValue, setSearchValue }) => {
  return (
    <main className={style.main}>
      <Navigation />
      <MainEvent />
      <MainLocation />
      <MainRoutes searchValue={searchValue} setSearchValue={setSearchValue} />

      <Layout>
        {/* <Recreation /> */}
        {/* <EventSelection /> */}
        <ScrollTop />
      </Layout>
    </main>
  );
};

export default Main;
