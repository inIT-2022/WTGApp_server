import style from './Header.module.css';
import { Logo } from './Logo/Logo';
import { Auth } from './Auth/Auth';
import { Layout } from '../../Layouts/Layout/Layout';

export const Header = () => {
  return (
    <header className={style.header} id='header'>
      <Layout>
        <div className={style.header__wrapper}>
          <Logo />
          <Auth />
        </div>
      </Layout>
    </header>
  );
};
