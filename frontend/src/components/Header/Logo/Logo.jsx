import style from './Logo.module.css';
import LogoIcon from './img/billboard.png';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link className={style.link} to='/'>
      <img className={style.logo__item_img} src={LogoIcon} alt='wtg app-logo' />
    </Link>
  );
};
