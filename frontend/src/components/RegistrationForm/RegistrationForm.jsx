import React, { useCallback, useState, useEffect } from 'react';
import style from './RegistrationForm.module.css';

export const RegistrationForm = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userNameDirty, setUserNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [userNameError, setUserNameError] = useState(
    'Username не должен быть пустым',
  );
  const [emailError, setEmailError] = useState('Email не должен быть пустым');
  const [passwordError, setPasswordError] = useState(
    'Password не должен быть пустым',
  );
  const [formValid, setFormValid] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(true);

  useEffect(() => {
    if (userNameError || emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [userNameError, emailError, passwordError]);

  const userNameHandler = (event) => {
    setUserName(event.target.value);
    if (event.target.value.length < 3 || event.target.value.length > 15) {
      setUserNameError(
        'Имя пользователя должно быть больше 3 и меньше 15 символов',
      );
      if (!event.target.value) {
        setUserNameError('Имя пользователя не может быть пустым');
      } else {
        setUserNameError('');
      }
    }
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(event.target.value).toLowerCase())) {
      setEmailError('Неккоректный email');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 3 || event.target.value.length > 8) {
      setPasswordError('Пароль должен быть длиннее 3 и меньше 8');
      if (!event.target.value) {
        setPasswordError('Пароль не может быть пустым');
      } else {
        setPasswordError('');
      }
    }
  };

  const blurHandler = (event) => {
    switch (event.target.name) {
      case 'userName':
        setUserNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      default:
        console.log('Error');
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsOpenModal(!isOpenModal);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  return (
    isOpenModal && (
      <div className={style.modal}>
        <div className={style.formBorder}>
          <form
            className={style.registration}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className={style.close}
              type='button'
              data-close
            >
              &times;
            </button>
            <h1 className={style.formTitle}>Регистрация</h1>
            {userNameError && userNameDirty && (
              <div style={{ color: 'red' }}>{userNameError}</div>
            )}
            <input
              onChange={(event) => userNameHandler(event)}
              value={userName}
              className={style.formInput}
              onBlur={(event) => blurHandler(event)}
              name='userName'
              type='text'
              placeholder='Введите Ваше имя...'
            />
            {emailDirty && emailError && (
              <div style={{ color: 'red' }}>{emailError}</div>
            )}
            <input
              onChange={(event) => emailHandler(event)}
              value={email}
              onBlur={(event) => blurHandler(event)}
              className={style.formInput}
              name='email'
              type='text'
              placeholder='Введите Ваш email...'
            />
            {passwordError && passwordDirty && (
              <div style={{ color: 'red' }}>{passwordError}</div>
            )}
            <input
              onChange={(event) => passwordHandler(event)}
              value={password}
              onBlur={(event) => blurHandler(event)}
              className={style.formInput}
              name='password'
              type='password'
              placeholder='Введите Ваш пароль...'
            />
            <button
              disabled={!formValid}
              className={style.registrationBtn}
              type='submit'
            >
              Вход
            </button>
          </form>
        </div>
      </div>
    )
  );
};
