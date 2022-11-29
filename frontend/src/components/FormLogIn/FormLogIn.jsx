import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { fetchAuthData } from '../../store/auth/authAction';
import style from './FormLogIn.module.css';

export const FormLogIn = ({ closeModal, switchToRegistration }) => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.data);

  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginDirty, setLoginDirty] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [agreePolicy, setAgreePolicy] = useState(false);
  const [policyError, setPolicyError] = useState(false);

  const [checkErrorForm, setCheckErrorForm] = useState(false);

  const validLogin = (value) => {
    setLoginError(value.length > 3);
  };

  const validPassword = (value) => {
    setPasswordError(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/.test(value));
  };

  const handleLogin = ({ target }) => {
    setLogin(target.value);
    validLogin(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
    validPassword(target.value);
  };

  const handleAgreePolicy = ({ target }) => setAgreePolicy(target.checked);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginError || !passwordError || !agreePolicy) {
      setCheckErrorForm(true);
      setPolicyError(true);
      return;
    }

    dispatch(fetchAuthData({ login, password }));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.wrap}>
        <input
          className={style.input}
          required
          type='text'
          id='login'
          name='login'
          value={login}
          onChange={handleLogin}
          onBlur={() => setLoginDirty(true)}
        />
        <label className={style.label} htmlFor='login'>
          Login
        </label>
        {!loginError && loginDirty && (
          <p className={style.error}>login слишком короткий</p>
        )}
      </div>

      <div className={style.wrap}>
        <input
          className={style.input}
          required
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={handlePassword}
          onBlur={() => setPasswordDirty(true)}
        />
        <label className={style.label} htmlFor='password'>
          Пароль
        </label>
        {!passwordError && passwordDirty && (
          <p className={style.errorPassword}>
            минимум 6 символов: строчная, прописная буква и цифра
          </p>
        )}
      </div>

      <div className={style.nav}>
        <p className={style.navLink} onClick={() => switchToRegistration()}>
          {' '}
          Зарегистрироваться
        </p>
        <p className={style.navLink}>Восстановить пароль</p>

        <div className={style.wrapCheckbox}>
          <input
            className={style.checkbox}
            type='checkbox'
            id='save'
            checked={agreePolicy}
            onChange={handleAgreePolicy}
          />
          <label className={style.labelCheckbox} htmlFor='save'>
            Ознакомлен c{' '}
            <Link className={style.policy}>политикой безопасности</Link>
          </label>
        </div>
      </div>

      <p className={style.errorSubmit}>
        {!agreePolicy && policyError
          ? 'Ознакомтесь с политикой безопасности'
          : ''}
        {Array.isArray(authData) ? 'Неверный логин или пароль' : ''}
      </p>

      <button className={style.submit} type='submit'>
        Подтвердить
      </button>
      {checkErrorForm && (!passwordError || !loginError) && (
        <p className={style.errorSubmit}>
          Проверьте правильность заполнения данных
        </p>
      )}
    </form>
  );
};
