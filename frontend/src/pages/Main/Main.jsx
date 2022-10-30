import style from './Main.module.css';
import EventSelection from '../../components/Main/EventSelection';
import MainEvent from '../../components/Main/MainEvent';
import Tabs from '../../components/Header/Tabs';
import { Layout } from '../../Layouts/Layout/Layout';
import Location from '../../components/Main/Location/';
import Routespage from '../../components/Routespage/Routespage';
import Recreation from '../../components/Main/Recreation';

const Main = ({ searchValue, setSearchValue }) => {
  return (
    <main className={style.main}>
      <Tabs />
      <MainEvent />
      <Layout>
        <Location searchValue={searchValue} setSearchValue={setSearchValue} />
        <Routespage searchValue={searchValue} setSearchValue={setSearchValue} />
        <Recreation />
        <EventSelection />
      </Layout>
    </main>
  );
};

export default Main;
