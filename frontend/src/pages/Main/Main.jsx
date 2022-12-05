import React from 'react';
import style from './Main.module.css';
import EventSelection from '../../components/Main/EventSelection';
import MainEvent from '../../components/Main/MainEvent';
import Tabs from '../../components/Header/Tabs';
import { Layout } from '../../Layouts/Layout/Layout';
import MainLocation from '../../components/Main/MainLocation';
import Routespage from '../../components/Routespage/Routespage';
import Recreation from '../../components/Main/Recreation';
import { ScrollTop } from '../../components/ScrollTop/ScrollTop';

const Main = ({ searchValue, setSearchValue }) => {
  return (
    <main className={style.main}>
      <Tabs />
      <MainEvent />
      <Layout>
        <MainLocation
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Routespage searchValue={searchValue} setSearchValue={setSearchValue} />
        {/* <Recreation /> */}
        {/* <EventSelection /> */}
        <ScrollTop />
      </Layout>
    </main>
  );
};

export default Main;
