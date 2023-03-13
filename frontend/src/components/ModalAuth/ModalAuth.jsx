import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '../../store/auth/authSlice';
import {
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
  const btnCloseRef = useRef(null);

  const showRegistration = useSelector(
    (state) => state.modal.isShowRegistration,
  );
  const showLogIn = useSelector((state) => state.modal.isShowLogin);
  const isShowModal = useSelector((state) => state.modal.isShowModal);

  const handleClose = (event) => {
    if (
      event.target === overlayRef.current ||
      event.target === btnCloseRef.current ||
      event.key === 'Escape'
    ) {
      dispatch(clearAuth());
      dispatch(clearSignUp());
      dispatch(setIsShowModal(false));
      dispatch(setIsShowRegistration(false));
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleClose, false);
    document.addEventListener('click', handleClose);

    return () => {
      document.removeEventListener('keydown', handleClose, false);
      document.removeEventListener('click', handleClose);
    };
  }, []);

  const switchToRegistration = () => {
    dispatch(setIsShowRegistration(true));
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

        <button ref={btnCloseRef} onClick={handleClose} className={style.close}>
          &times;
        </button>
      </div>
    </div>
  );
};
