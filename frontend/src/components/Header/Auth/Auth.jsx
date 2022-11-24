import style from './Auth.module.css';
import { ReactComponent as AuthIcon } from './img/auth.svg';
import { useState } from 'react';
import { Modal } from '../../Modal/Modal';

export const Auth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClickAuth = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className={style.auth__text}>
          <button className={style.auth__user_name} onClick={handleOpenModal}>
            Авторизация
          </button>
        </div>
      )}
      <button className={style.auth__button} onClick={handleClickAuth}>
        <AuthIcon className={style.auth__icon} />
      </button>
      {showModal && <Modal closeModal={() => setShowModal(false)} />}{' '}
    </div>
  );
};
