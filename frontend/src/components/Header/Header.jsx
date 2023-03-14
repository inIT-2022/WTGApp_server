import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Auth from './Auth';
import Layout from '../../Layouts/Layout';
import Search from '../Search';
import ModalAuth from '../ModalAuth';
import WarningMessage from './WarningMessage';

import { setIsShowModal } from '../../store/modal/modalSlice';

import logo from '../../img/logo.jpg';
import style from './Header.module.css';
import { clearSearch } from '../../store/search/searchSlice';
import { resetLocations } from '../../store/locations/locationsSlice';
import {
  resetCategory,
  setCategory,
  setDefaultScale,
  setLocation,
} from '../../store/routes/routesSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showWarning, setShowWarning] = useState(true);
  const [isShowGreetings, setIsShowGreetings] = useState(false);

  const location = useLocation();
  const { id, type } = useParams();

  const token = useSelector((state) => state.auth.data.token);
  const login = useSelector((state) => state.auth.data.login);

  useEffect(() => {
    setIsShowGreetings(false);
    if (!login) return;

    setIsShowGreetings(true);
    const greetingsTimer = setTimeout(() => {
      setIsShowGreetings(false);
    }, 5000);

    return () => {
      clearTimeout(greetingsTimer);
    };
  }, [login]);

  const handleOpenModal = () => {
    dispatch(setIsShowModal(true));
  };

  const handleClickLogo = () => {
    navigate('/');
    dispatch(clearSearch());
    dispatch(resetLocations());
    dispatch(setCategory(''));
    dispatch(setLocation(''));
    dispatch(resetCategory(''));
    dispatch(setDefaultScale());
  };

  return (
    <header className={style.header} id='header'>
      <Layout>
        <div className={style.wrapper}>
          <div className={style.content}>
            {location.pathname === '/' && (
              <>
                <h1 className={style.title}>КУДА СХОДИТЬ?</h1>
                <p className={style.subtitle}>
                  отдых, который подойдет именно Вам
                </p>
                <span className={style.city}>Краснодар</span>
                {!token && showWarning && (
                  <WarningMessage
                    openModal={() => dispatch(setIsShowModal(true))}
                    setClose={() => setShowWarning(false)}
                  />
                )}
              </>
            )}

            {location.pathname === '/events' && (
              <>
                <p className={style.events}>Топ событий этой недели</p>
                <p className={style.subtitleEvents}>
                  все значимые события города и края
                </p>
                <div className={style.searchWrapper}>
                  <Search searchType={'events'} />
                </div>
              </>
            )}

            {location.pathname === `/events/${id}` && (
              <>
                <p className={style.events}>Cобытие</p>
                <p className={style.subtitleEvents}>
                  место, куда вам захочется вернуться :)
                </p>
              </>
            )}

            {location.pathname === '/locations' && (
              <>
                <p className={style.events}>Топ локаций</p>
                <p className={style.subtitleEvents}>
                  место, куда вам захочется вернуться :)
                </p>
                <div className={style.searchWrapper}>
                  <Search searchType={'locations'} />
                </div>
              </>
            )}

            {location.pathname === `/locations/${id}` && (
              <>
                <p className={style.events}>лОКация</p>
                <p className={style.subtitleEvents}>
                  место, куда вам захочется вернуться :)
                </p>
              </>
            )}
            {location.pathname === `/routes/${type}` && (
              <>
                <p className={style.events}>маршрутЪ</p>
                <p className={style.subtitleEvents}>который стоит пройти :)</p>
              </>
            )}
            {location.pathname === `/routespages/${id}` && (
              <>
                <p className={style.events}>Страница в разработке</p>
              </>
            )}
          </div>
          <div className={style.iconWrapper}>
            {isShowGreetings && (
              <div className={style.header__authText}>
                <p className={style.authText}>Добро пожаловать,</p>
                <p className={style.login}>{login} </p>
              </div>
            )}
            <Auth openModal={() => handleOpenModal()} />
            <button className={style.logoWrapper} onClick={handleClickLogo}>
              <img src={logo} alt='логотип' />
            </button>
          </div>
        </div>

        {!token && <ModalAuth />}
      </Layout>
    </header>
  );
};
