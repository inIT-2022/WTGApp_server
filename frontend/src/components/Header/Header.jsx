import style from './Header.module.css';
import { Auth } from './Auth/Auth';
import { Layout } from '../../Layouts/Layout/Layout';
import { Search } from '../Search/Search';

export const Header = () => {
  return (
    <header className={style.header} id='header'>
      <Layout>
        <div className={style.header__wrapper}>
          <div>
            <h1 className={style.title}>КУДА СХОДИТЬ?</h1>
            <p className={style.subtitle}>отдых, который подойдет именно Вам</p>
            <div className={style.search}>
              <span className={style.city}>Краснодар</span>
              <Search />
            </div>
          </div>
          <Auth />
        </div>
      </Layout>
    </header>
  );
};
