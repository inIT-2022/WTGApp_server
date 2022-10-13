import style from './Main.module.css';
import Location from '../../components/Main/Location/Location';
import EventSelection from '../../components/Main/EventSelection';
import Layout from '../../Layouts/Layout';
import Events from '../../components/Main/Events';

const Main = () => {
  return (
    <main className={style.main}>
      <Layout>
        <Events />
        <Location />
        <EventSelection />
      </Layout>
    </main>
  );
};

export default Main;
