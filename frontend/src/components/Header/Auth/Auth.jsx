import { useSelector } from 'react-redux';

import { ReactComponent as AuthIcon } from './img/auth.svg';
import { ReactComponent as LoggedIcon } from './img/logged.svg';

import style from './Auth.module.css';

export const Auth = ({ openModal }) => {
  const authData = useSelector((state) => state.auth.data);

  return (
    <>
      {authData?.login ? (
        <button className={style.buttonLogged}>
          <LoggedIcon className={style.icon} />
        </button>
      ) : (
        <button className={style.button} onClick={openModal}>
          <AuthIcon className={style.icon} />
        </button>
      )}
    </>
  );
};
