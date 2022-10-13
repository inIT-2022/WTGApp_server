import style from './Auth.module.css';
import { ReactComponent as AuthIcon } from './img/auth.svg';
import { CSSTransition } from 'react-transition-group';
import { RegistrationForm } from '../../RegistrationForm/RegistrationForm';
import { useState } from 'react';

export const Auth = () => {
  const [showModalForm,  setShowModalForm] = useState(false);

  return (
    <div>
      <button className={style.auth__button} onClick={() => setShowModalForm(!showModalForm)}>
        <AuthIcon/>
      </button>
      <CSSTransition classNames='alert' in={showModalForm} timeout={800} unmountOnExit>
          <RegistrationForm />
      </CSSTransition>
    </div>
  )
};

