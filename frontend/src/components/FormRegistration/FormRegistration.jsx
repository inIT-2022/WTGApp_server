import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './FormRegistration.module.css';
import { useDispatch } from 'react-redux';
import { authregistration } from '../../store/auth/authSlice';

export const FormRegistration = ({ closeModal, switchToLogIn }) => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginDirty, setLoginDirty] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [save, setSave] = useState(false);

  const [checkErrorForm, setCheckErrorForm] = useState(false);

  const validLogin = (value) => {
    setLoginError(value.length > 3);
  };
  const validEmail = (value) => {
    setEmailError(/^.+@.+\..+$/.test(value));
  };
  const validPassword = (value) => {
    setPasswordError(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/.test(value));
  };

  const handleLogin = ({ target }) => {
    setLogin(target.value);
    validLogin(target.value);
  };
  const handleEmail = ({ target }) => {
    setEmail(target.value);
    validEmail(target.value);
  };
  const handlePassword = ({ target }) => {
    setPassword(target.value);
    validPassword(target.value);
  };

  const handleSave = ({ target }) => setSave(target.checked);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginError || !emailError || !passwordError) {
      setCheckErrorForm(true);
      return;
    }
    dispatch(authregistration({ login, email, password, save }));
    console.log({ login, email, password, save });
    closeModal();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.wrap}>
        <label className={style.label} htmlFor='login'>
          Login
        </label>
        <input
          className={style.input}
          type='text'
          id='login'
          name='login'
          placeholder='логин'
          value={login}
          onChange={handleLogin}
          onBlur={() => setLoginDirty(true)}
        />
        {!loginError && loginDirty && (
          <p className={style.error}>login слишком короткий</p>
        )}
      </div>

      <div className={style.wrap}>
        <label className={style.label} htmlFor='email'>
          Email
        </label>
        <input
          className={style.input}
          type='text'
          id='email'
          name='email'
          placeholder='email'
          value={email}
          onChange={handleEmail}
          onBlur={() => setEmailDirty(true)}
        />
        {!emailError && emailDirty && (
          <p className={style.error}>введите корректный email</p>
        )}
      </div>

      <div className={style.wrap}>
        <label className={style.label} htmlFor='password'>
          Пароль
        </label>
        <input
          className={style.input}
          type='password'
          id='password'
          name='password'
          placeholder='пароль'
          value={password}
          onChange={handlePassword}
          onBlur={() => setPasswordDirty(true)}
        />
        {!passwordError && passwordDirty && (
          <p className={style.errorPassword}>
            минимум 6 символов: строчная, прописная буква и цифра
          </p>
        )}
      </div>

      <div className={style.nav}>
        <p className={style.navLink} onClick={() => switchToLogIn()}>
          {' '}
          Войти в аккаунт
        </p>
        <p className={style.navLink}>Восстановить пароль</p>

        <div className={style.wrapCheckbox}>
          <input
            className={style.checkbox}
            type='checkbox'
            id='save'
            name='save'
            checked={save}
            onChange={handleSave}
          />
          <label className={style.labelCheckbox} htmlFor='save'>
            Ознакомлен c{' '}
            <Link className={style.policy}>политикой безопасности</Link>
          </label>
        </div>
      </div>
      <button className={style.submit} type='submit'>
        Подтвердить
      </button>
      {checkErrorForm && (!passwordError || !loginError || !emailError) && (
        <p className={style.errorSubmit}>
          Проверьте правильность заполнения данных
        </p>
      )}
    </form>
  );
};
