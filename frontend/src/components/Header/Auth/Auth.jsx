import style from './Auth.module.css';
import { ReactComponent as AuthIcon } from './img/auth.svg';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Auth = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClickAuth = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenModal = () => {
    navigate('authorisation', { state: location.pathname });
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {!isOpen && (
        <div className={style.auth__text}>
          <button className={style.auth__user_name} onClick={handleOpenModal}>
            Авторизация
          </button>
        </div>
      )}

      <button className={style.auth__button} onClick={handleClickAuth}>
        <AuthIcon className={style.auth__icon} />
      </button>
    </div>
  );
};
