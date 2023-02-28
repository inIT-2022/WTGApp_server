import { useState } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '../../store/auth/authSlice';
import {
  setIsShowLogin,
  setIsShowModal,
  setIsShowRegistration,
} from '../../store/modal/modalSlice';
import { clearSignUp } from '../../store/signup/signupSlice';

import { FormLogIn } from '../FormLogIn/FormLogIn';
import { FormRegistration } from '../FormRegistration/FormRegistration';

import style from './ModalAuth.module.css';

export const ModalAuth = () => {
  const dispatch = useDispatch();
  const overlayRef = useRef(null);
  const [showRestorePassword, setShowRestorePassword] = useState(false);

  const showRegistration = useSelector(
    (state) => state.modal.isShowRegistration,
  );
  const showLogIn = useSelector((state) => state.modal.isShowLogin);
  const isShowModal = useSelector((state) => state.modal.isShowModal);

  const handleClickOverlay = (e) => {
    const target = e.target;
    if (target === overlayRef.current) {
      dispatch(clearAuth());
      dispatch(clearSignUp());
      dispatch(setIsShowModal(false));
      dispatch(setIsShowLogin(true));
      dispatch(setIsShowRegistration(false));
    }
  };

  const handleClickClose = useCallback(() => {
    dispatch(clearAuth());
    dispatch(clearSignUp());
    dispatch(setIsShowModal(false));
    dispatch(setIsShowLogin(true));
    dispatch(setIsShowRegistration(false));
  }, []);

  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      dispatch(clearAuth());
      dispatch(clearSignUp());
      dispatch(setIsShowModal(false));
      dispatch(setIsShowLogin(true));
      dispatch(setIsShowRegistration(false));
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
    dispatch(setIsShowRegistration(true));
    dispatch(setIsShowLogin(false));
    setShowRestorePassword(false);
  };

  return (
    <div
      className={!isShowModal ? style.overlay : style.overlayActive}
      ref={overlayRef}
    >
      <div className={!isShowModal ? style.modal : style.modalActive}>
        {showLogIn && (
          <>
            <p className={style.title}>Вход</p>
            <FormLogIn switchToRegistration={switchToRegistration} />
          </>
        )}

        {showRegistration && (
          <>
            <p className={style.title}>Регистрация</p>
            <FormRegistration />
          </>
        )}

        <button onClick={handleClickClose} className={style.close}>
          &times;
        </button>
      </div>
    </div>
  );
};
