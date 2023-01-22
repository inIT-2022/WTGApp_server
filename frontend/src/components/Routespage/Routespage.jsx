import style from './Routespage.module.css';
import slide_1 from './img/slide_1.jpg';
import slide_2 from './img/slide_2.jpg';
import slide_3 from './img/slide_3.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Layout from '../../Layouts/Layout';
import SectionTitle from '../SectionTitle';
import SectionSearch from '../SectionSearch';

const Routes = ({ searchValue, setSearchValue }) => {
  const authData = useSelector((state) => state.auth.data);
  const [isShowMessage, setIsShowMessage] = useState(false);

  const showMessage = () => {
    setIsShowMessage(!isShowMessage);
    setTimeout(() => {
      setIsShowMessage(false);
    }, 1500);
  };

  return (
    <section className={style.routes} id='routes'>
      <Layout>
        {!authData?.login ? (
          <div className={style.authBlure} onClick={showMessage}>
            {isShowMessage ? (
              <p className={style.message}>Необходимо авторизоваться </p>
            ) : null}
          </div>
        ) : null}
        <SectionTitle text={'яркие маршруты'} />
        <SectionSearch
          text={'которые стоит пройти'}
          section={'routes'}
          placeholder={'отыщи свой путь'}
        />
        <ul className={style.gallery}>
          <li>
            <h3 className={style.text}>Пеший</h3>
            <Link className={style.link} to='/routespages/1'>
              <img className={style.img} src={slide_1} alt='Пеший'></img>
            </Link>
          </li>

          <li>
            <h3 className={style.text}>Вело</h3>
            <Link className={style.link} to='/routespages/2'>
              <img className={style.img} src={slide_2} alt='Вело'></img>{' '}
            </Link>
          </li>

          <li>
            <h3 className={style.text}>Авто</h3>
            <Link className={style.link} to='routespages/3'>
              <img className={style.img} src={slide_3} alt='Авто'></img>{' '}
            </Link>
          </li>
        </ul>
      </Layout>
    </section>
  );
};

export default Routes;
