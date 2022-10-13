import style from './Header.module.css';
import { Logo } from './Logo/Logo';
import { Auth } from './Auth/Auth';
import Container from '../Container/Container';
import Tabs from './Tabs';

export const Header = () => {
  return (
    <header className={style.header} id='header'>
      <Container>
        <div className={style.container}>
          <Logo />
          <Auth />
          <Tabs />
        </div>
      </Container>
    </header>
  );
};
