import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import slide_1 from './img/slide_1.jpg';
import slide_2 from './img/slide_2.jpg';
import slide_3 from './img/slide_3.jpg';

import Layout from '../../../Layouts/Layout';
import SectionTitle from '../../SectionTitle';
import Modal from '../../Modal';
import RoutSelectCard from '../../RoutSelectCard';
// import SectionSearch from '../../SectionSearch';

import { setType } from '../../../store/routes/routesSlice';

import style from './MainRoutes.module.css';

const routeTypes = [
  { type: { rus: 'Пеший', eng: 'Walk' }, image: slide_1 },
  { type: { rus: 'Вело', eng: 'Bicycle' }, image: slide_2 },
  { type: { rus: 'Авто', eng: 'Car' }, image: slide_3 },
];

export const MainRoutes = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.data.token);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [ShowModal, setShowModal] = useState(false);

  const showMessage = () => {
    setIsShowMessage(!isShowMessage);
    setTimeout(() => {
      setIsShowMessage(false);
    }, 1500);
  };

  const handleClickType = (item) => {
    setShowModal(true);
    dispatch(setType(item.type.eng));
  };

  return (
    <section className={style.routes} id='routes'>
      <Layout>
        {!token ? (
          <div className={style.authBlure} onClick={showMessage}>
            {isShowMessage ? (
              <p className={style.message}>Необходимо авторизоваться </p>
            ) : null}
          </div>
        ) : null}
        <SectionTitle text={'яркие маршруты'} />
        {/* <SectionSearch
          text={'которые стоит пройти'}
          section={'routes'}
          placeholder={'отыщи свой путь'}
        /> */}
        <ul className={style.gallery}>
          {routeTypes.map((item, i) => (
            <li key={i}>
              <h3 className={style.text}>{item.type.rus}</h3>
              <button
                className={style.link}
                onClick={() => handleClickType(item)}
              >
                <img
                  className={style.img}
                  src={item.image}
                  alt={item.type}
                ></img>
              </button>
            </li>
          ))}
        </ul>
      </Layout>
      {ShowModal ? (
        <Modal
          active={ShowModal}
          closeModal={() => setShowModal(false)}
          children={<RoutSelectCard closeModal={() => setShowModal(false)} />}
        />
      ) : null}
    </section>
  );
};
