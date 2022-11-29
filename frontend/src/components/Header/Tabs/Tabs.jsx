import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from '../../../Layouts/Layout/Layout';
import style from './Tabs.module.css';

export const Tabs = () => {
  const authData = useSelector((state) => state.auth.data);

  return (
    <Layout>
      <div className={style.tabs}>
        <nav className={style.header__navigation}>
          <ul className={style.navigation__list}>
            <li key={1} className={style.navigation__link}>
              <a href='#events'>События</a>
            </li>
            <li key={2} className={style.navigation__link}>
              <a href='#locations'>Локации</a>
            </li>
            <li
              key={3}
              className={
                !authData?.login
                  ? style.navigation__link + ' ' + style.auth
                  : style.navigation__link
              }
            >
              <a href='#routes'>Маршруты</a>
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
};
