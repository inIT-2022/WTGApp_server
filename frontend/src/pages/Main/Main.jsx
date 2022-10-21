import style from './Main.module.css';
import Location from '../../components/Main/Location/Location';
import EventSelection from '../../components/Main/EventSelection';
import Events from '../../components/Main/Events';
import Tabs from '../../components/Header/Tabs';
import { Layout } from '../../Layouts/Layout/Layout';

const Main = () => {
  return (
    <main className={style.main}>
      <Tabs />
      <Events />
      <Layout>
        <Location />
        <EventSelection />
      </Layout>
    </main>
  );
};

export default Main;
