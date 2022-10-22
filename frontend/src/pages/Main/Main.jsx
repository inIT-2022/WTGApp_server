import style from './Main.module.css';
import EventSelection from '../../components/Main/EventSelection';
import Events from '../../components/Main/Events';
import Tabs from '../../components/Header/Tabs';
import { Layout } from '../../Layouts/Layout/Layout';
import Location from '../../components/Main/Location/';
import Routes from '../../components/Routes/Routes';

const Main = ({ searchValue, setSearchValue }) => {
  return (
    <main className={style.main}>
      <Tabs />
      <Events />
      <Layout>
        <Location searchValue={searchValue} setSearchValue={setSearchValue} />
        <Routes searchValue={searchValue} setSearchValue={setSearchValue} />
        <EventSelection />
      </Layout>
    </main>
  );
};

export default Main;
