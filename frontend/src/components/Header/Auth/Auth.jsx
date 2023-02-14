import { useSelector } from 'react-redux';

import { ReactComponent as AuthIcon } from './img/auth.svg';

import style from './Auth.module.css';

export const Auth = ({ openModal }) => {
  const firstName = useSelector((state) => state.auth.data.firstName);
  const logoLetter = firstName?.charAt(0).toUpperCase();

  const handleClickBtnLogged = () => {};
  return (
    <>
      {firstName ? (
        <button className={style.buttonLogged} onClick={handleClickBtnLogged}>
          <span className={style.logoLetter}>{logoLetter}</span>
        </button>
      ) : (
        <button className={style.button} onClick={openModal}>
          <AuthIcon className={style.icon} />
        </button>
      )}
    </>
  );
};
