import { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Form } from '../Form/Form';

import style from './Modal.module.css';

export const Modal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const overlayRef = useRef(null);

  const handleClickOverlay = (e) => {
    const target = e.target;
    if (target === overlayRef.current) {
      navigate(`${location.state}`);
    }
  };

  const handleClickClose = useCallback(() => {
    navigate(`${location.state}`);
  }, []);

  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      navigate(`${location.state}`);
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

  return (
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        <p className={style.title}>Вход</p>
        <Form />
        <button onClick={handleClickClose} className={style.close}>
          &times;
        </button>
      </div>
    </div>
  );
};
