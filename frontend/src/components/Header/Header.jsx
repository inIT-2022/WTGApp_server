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

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { id } = useParams();

  return (
    <header className={style.header} id='header'>
      <Layout>
        <div className={style.header__wrapper}>
          <div>
            <h1 className={style.title}>КУДА СХОДИТЬ?</h1>
            <p className={style.subtitle}>отдых, который подойдет именно Вам</p>
            <div className={style.search}>
              <span className={style.city}>Краснодар</span>
            </div>
          </div>
          <div className={style.header__wrapper}>
            <Auth />
            {
              isOpen && (
                <div className={style.header__burger_menu} >
                    <Collection className={style.header__burger_svg} />
                    <Chat className={style.header__burger_svg} />
                    <Notification className={style.header__burger_svg} />
                </div>
              )
            }
            <BurgerSvg className={style.header__burger} onClick={() => setIsOpen(!isOpen)} />
          </div>
        </div>
      </Layout>
    </header>
  );
};
