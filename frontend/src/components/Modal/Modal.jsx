import { useCallback, useEffect, useRef } from 'react';

import style from './Modal.module.css';

export const Modal = ({ active, closeModal, children }) => {
  const overlayRef = useRef(null);

  const handleClickOverlay = (e) => {
    const target = e.target;
    if (target === overlayRef.current) {
      closeModal();
    }
  };

  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      closeModal();
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
    <div
      className={!active ? style.overlay : style.overlayActive}
      ref={overlayRef}
    >
      <div className={!active ? style.modal : style.modalActive}>
        {children}
      </div>
    </div>
  );
};
