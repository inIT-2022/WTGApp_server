import React from 'react';
import { Layout } from '../../../Layouts/Layout/Layout';
import style from './Navigation.module.css';

export const Navigation = () => {
  const login = localStorage.getItem('login');

  return (
    <section className={style.navigation}>
      <Layout>
        <nav>
          <ul className={style.list}>
            <li key={1} className={style.link}>
              <a href='#events'>События</a>
            </li>
            <li key={2} className={style.link}>
              <a href='#locations'>Локации</a>
            </li>
            <li
              key={3}
              className={!login ? style.link + ' ' + style.logout : style.link}
            >
              <a href='#routes'>Маршруты</a>
            </li>
          </ul>
        </nav>
      </Layout>
    </section>
  );
};
