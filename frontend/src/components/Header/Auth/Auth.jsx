import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as AuthIcon } from './img/auth.svg';
import { ReactComponent as LogoutIcon } from './img/logout.svg';

import style from './Auth.module.css';
import { useState } from 'react';
import { clearAuth } from '../../../store/auth/authSlice';

export const Auth = ({ openModal }) => {
  const dispatch = useDispatch();
  const [isShowAuthMenu, setIsShowAuthMenu] = useState(false);
  const firstName = useSelector((state) => state.auth.data.firstName);
  const logoLetter = firstName?.charAt(0).toUpperCase();

  const handleClickLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('firstName');
    dispatch(clearAuth());
    setIsShowAuthMenu(false);
  };

  const handleClickBtnLogged = () => {
    setIsShowAuthMenu(!isShowAuthMenu);
  };
  return (
    <div className={style.auth}>
      {firstName ? (
        <button className={style.buttonLogged} onClick={handleClickBtnLogged}>
          <span className={style.logoLetter}>{logoLetter}</span>
        </button>
      ) : (
        <button className={style.button} onClick={openModal}>
          <AuthIcon className={style.icon} />
        </button>
      )}
      {isShowAuthMenu ? (
        <div className={style.authMenu}>
          <LogoutIcon
            className={style.logoutIcon}
            onClick={handleClickLogout}
          />
        </div>
      ) : null}
    </div>
  );
};
