import { Link } from 'react-router-dom';
import { Layout } from '../../../Layouts/Layout/Layout';
import style from './MainEvent.module.css';

export const MainEvent = () => (
  <section className={style.events} id='events'>
    <Link to='/events' className={style.link} />
    <Layout>
      <div className={style.wrapper}>
        <h2 className={style.title}>главные события этой недели</h2>
        <p className={style.text}>все значимые события города и края</p>
      </div>
    </Layout>
  </section>
);
