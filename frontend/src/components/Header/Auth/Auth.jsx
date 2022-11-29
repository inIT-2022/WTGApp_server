import { useSelector } from 'react-redux';

import { ReactComponent as AuthIcon } from './img/auth.svg';
import { ReactComponent as LoggedIcon } from './img/logged.svg';

import style from './Auth.module.css';

export const Auth = ({ openModal }) => {
  const authData = useSelector((state) => state.auth.data);

  return (
    <div>
      {authData?.login ? (
        <button className={style.auth__buttonLogged}>
          <LoggedIcon className={style.auth__icon} />
        </button>
      ) : (
        <button className={style.auth__button} onClick={openModal}>
          <AuthIcon className={style.auth__icon} />
        </button>
      )}
    </div>
  );
};
