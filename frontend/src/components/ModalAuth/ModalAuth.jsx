import { useState } from 'react';
import { useCallback, useEffect, useRef } from 'react';

import { FormLogIn } from '../FormLogIn/FormLogIn';
import { FormRegistration } from '../FormRegistration/FormRegistration';

import style from './ModalAuth.module.css';

export const ModalAuth = ({ active, closeModal }) => {
  const overlayRef = useRef(null);
  const [showLogIn, setShowLogIn] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showRestorePassword, setShowRestorePassword] = useState(false);

  const handleClickOverlay = (e) => {
    const target = e.target;
    if (target === overlayRef.current) {
      closeModal();
      setShowLogIn(true);
      setShowRegistration(false);
    }
  };

  const handleClickClose = useCallback(() => {
    closeModal();
    setShowLogIn(true);
    setShowRegistration(false);
  }, []);

  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      closeModal();
      setShowLogIn(true);
      setShowRegistration(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false);
    document.addEventListener('click', handleClickOverlay);

    return () => {
      document.removeEventListener('keydown', handleEscape, false);
      document.removeEventListener('click', handleClickOverlay);
    };
  }, []);

  const switchToRegistration = () => {
    setShowRegistration(true);
    setShowLogIn(false);
    setShowRestorePassword(false);
  };

  return (
    <div
      className={!active ? style.overlay : style.overlayActive}
      ref={overlayRef}
    >
      <div className={!active ? style.modal : style.modalActive}>
        {showLogIn && (
          <>
            <p className={style.title}>Вход</p>
            <FormLogIn
              closeModal={closeModal}
              switchToRegistration={switchToRegistration}
            />
          </>
        )}

        {showRegistration && (
          <>
            <p className={style.title}>Регистрация</p>
            <FormRegistration closeModal={closeModal} />
          </>
        )}

        <button onClick={handleClickClose} className={style.close}>
          &times;
        </button>
      </div>
    </div>
  );
};
