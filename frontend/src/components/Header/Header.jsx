import style from './Header.module.css';
import { Auth } from './Auth/Auth';
import { Layout } from '../../Layouts/Layout/Layout';
import { ReactComponent as BurgerSvg } from './img/burger_menu.svg';
import { ReactComponent as Notification } from './img/notification.svg';
import { ReactComponent as Collection } from './img/collection.svg';
import { ReactComponent as Chat } from './img/chat.svg';
import { useState } from 'react';
import { Search } from '../Search/Search';
import { useLocation, useParams } from 'react-router-dom';
import { Modal } from '../Modal/Modal';
import { WarningMessage } from './WarningMessage/WarningMessage';
import { useSelector } from 'react-redux';

export const Header = () => {
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const { id } = useParams();

  const authData = useSelector((state) => state.auth.data);

  const handleOpenModal = () => {
    setShowModal(true);
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
                {!authData.login && showWarning && (
                  <WarningMessage setClose={() => setShowWarning(false)} />
                )}
              </>
            )}

            {location.pathname === '/events' && (
              <>
                <p className={style.events}>Топ событий этой недели</p>
                <p className={style.subtitleEvents}>
                  все значимые события города и края
                </p>
                <Search searchType={'events'} />
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
                <Search searchType={'locations'} />
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
            {location.pathname === `/routespages/${id}` && (
              <>
                <p className={style.events}>Страница в разработке</p>
              </>
            )}
          </div>
          <div className={style.iconWrapper}>
            {authData?.login && (
              <div className={style.header__authText}>
                <p className={style.authText}>Добро пожаловать,</p>
                <p className={style.login}>{authData?.login} !</p>
              </div>
            )}
            <Auth openModal={() => handleOpenModal()} />
            {isOpenBurger && (
              <div className={style.header__burgerMenu}>
                <Collection className={style.header__burger_svg} />
                <Chat className={style.header__burger_svg} />
                <Notification className={style.header__burger_svg} />
              </div>
            )}
            <button
              className={style.burgerBtn}
              onClick={() => setIsOpenBurger(!isOpenBurger)}
            >
              <BurgerSvg />
            </button>
          </div>
        </div>

        {!authData?.login && (
          <Modal active={showModal} closeModal={() => setShowModal(false)} />
        )}
      </Layout>
    </header>
  );
};
