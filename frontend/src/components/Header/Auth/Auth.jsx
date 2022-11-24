import style from './Auth.module.css';
import { ReactComponent as AuthIcon } from './img/auth.svg';
import { ReactComponent as LoggedIcon } from './img/logged.svg';
import { useEffect, useState } from 'react';
import { Modal } from '../../Modal/Modal';
import { useSelector } from 'react-redux';

export const Auth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const authData = useSelector((state) => state.auth.data);
  console.log('authData: ', authData);

  const data = {
    login: 'anton',
    email: 'ddd@mmm.ru',
    password: 'AAAaaa123',
    firstName: '',
    lastName: '',
    birthdayDate: '',
    userRoleString: '',
  };

  useEffect(() => {
    fetch('http://localhost:8179/wtg/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => console.log('res:', res));
  }, []);

  const handleClickAuth = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen &&
        (!authData.login ? (
          <div className={style.auth__text}>
            <button className={style.auth__user_name} onClick={handleOpenModal}>
              Авторизация
            </button>
          </div>
        ) : (
          <div className={style.auth__text}>
            <span className={style.auth__user_name}>
              Добро пожаловать{authData.login ? `, ${authData.login}` : ''}
            </span>
          </div>
        ))}
      <button className={style.auth__button} onClick={handleClickAuth}>
        {!authData.login ? (
          <AuthIcon className={style.auth__icon} />
        ) : (
          <LoggedIcon className={style.auth__icon} />
        )}
      </button>

      <Modal active={showModal} closeModal={() => setShowModal(false)} />
    </div>
  );
};
