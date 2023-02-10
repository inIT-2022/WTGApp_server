import React from 'react';
import { useSelector } from 'react-redux';

import { Layout } from '../../../Layouts/Layout/Layout';

import style from './Navigation.module.css';

export const Navigation = () => {
  const token = useSelector((state) => state.auth.data.token);

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
              className={!token ? style.link + ' ' + style.logout : style.link}
            >
              <a href='#routes'>Маршруты</a>
            </li>
          </ul>
        </nav>
      </Layout>
    </section>
  );
};
