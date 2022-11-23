import style from './Auth.module.css';
import { ReactComponent as AuthIcon } from './img/auth.svg';
import { CSSTransition } from 'react-transition-group';
import { RegistrationForm } from '../../RegistrationForm/RegistrationForm';
import { useState } from 'react';

export const Auth = () => {
  const [showModalForm, setShowModalForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {isOpen && (
        <div className={style.auth__text}>
          <p className={style.auth__user_name}>Добро пожаловать, Павел!</p>
        </div>
      )}

      <button
        className={style.auth__button}
        onClick={() => setShowModalForm(!showModalForm)}
      >
        <AuthIcon
          className={style.auth__icon}
          onClick={() => setIsOpen(!isOpen)}
        />
      </button>

      <CSSTransition
        classNames='alert'
        in={showModalForm}
        timeout={10000}
        unmountOnExit
      >
        <RegistrationForm />
      </CSSTransition>
    </div>
  );
};
