import { useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authregistration } from '../../store/auth/authSlice';

import style from './FormRegistration.module.css';
import { useState } from 'react';
import { useRef } from 'react';

export const FormRegistration = ({ closeModal, switchToLogIn }) => {
  const dispatch = useDispatch();
  const [agree, setAgree] = useState(false);
  const [show, setShow] = useState(false);
  const checkRef = useRef(null);

  const handleAgree = ({ target }) => setAgree(target.checked);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(checkRef?.current?.checked);

  const onSubmit = (data) => {
    if (!checkRef?.current?.checked) {
      setShow(true);
      return;
    }
    data.birthdayDate = '2022-07-08';
    dispatch(authregistration(data));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.wrap}>
        <input
          className={style.input}
          type='text'
          required
          id='login'
          aria-invalid={!!errors.login}
          {...register('login', {
            required: {
              value: true,
              message: 'Заполните поле',
            },
            pattern: {
              value: /.{3,}/,
              message: 'Слишком короткий login',
            },
          })}
        />
        <label className={style.label} htmlFor='login'>
          Login
        </label>
        <p className={style.error}>{errors.login?.message || ''}</p>
      </div>

      <div className={style.wrap}>
        <input
          className={style.input}
          type='text'
          id='firstName'
          required
          aria-invalid={!!errors.firstName}
          {...register('firstName', {
            required: {
              value: true,
              message: 'Заполните поле',
            },
          })}
        />
        <label className={style.label} htmlFor='firstName'>
          Имя
        </label>
        <p className={style.error}>{errors.firstName?.message || ''}</p>
      </div>

      <div className={style.wrap}>
        <input
          className={style.input}
          type='text'
          id='lastName'
          required
          aria-invalid={!!errors.lastName}
          {...register('lastName', {
            required: {
              value: true,
              message: 'Заполните поле',
            },
          })}
        />
        <label className={style.label} htmlFor='lastName'>
          Login
        </label>
        <p className={style.error}>{errors.lastName?.message || ''}</p>
      </div>

      <div className={style.wrap}>
        <input
          className={style.input}
          type='text'
          id='email'
          required
          aria-invalid={!!errors.email}
          {...register('email', {
            required: {
              value: true,
              message: 'Заполните поле',
            },
            pattern: {
              value: /^.+@.+\..+$/,
              message: 'введите корректный email',
            },
          })}
        />
        <label className={style.label} htmlFor='email'>
          Email
        </label>
        <p className={style.error}>{errors.email?.message || ''}</p>
      </div>

      <div className={style.wrapHidden}>
        <input
          className={style.input}
          type='text'
          id='userRoleString'
          placeholder='Роль'
          value='ROLE_USER'
          {...register('userRoleString')}
        />
        <label className={style.label} htmlFor='userRoleString'>
          Роль
        </label>
        <p className={style.error}>введите корректный email</p>
      </div>

      <div className={style.wrap}>
        <input
          className={style.input}
          type='password'
          id='password'
          required
          aria-invalid={!!errors.password}
          {...register('password', {
            required: {
              value: true,
              message: 'Заполните поле',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/,
              message: 'минимум 6 символов: строчная, прописная буква и цифра',
            },
          })}
        />
        <label className={style.label} htmlFor='password'>
          Пароль
        </label>
        <p className={style.errorPassword}>{errors.password?.message || ''}</p>
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
            ref={checkRef}
            type='checkbox'
            id='policy'
            checked={agree}
            onChange={handleAgree}
          />
          <label className={style.labelCheckbox} htmlFor='policy'>
            Ознакомлен c{' '}
            <Link className={style.policy}>политикой безопасности</Link>
          </label>
        </div>
      </div>
      <p className={style.errorSubmit}>
        {show && !agree ? 'Ознакомтесь с политикой безопасности' : ''}
      </p>

      <button className={style.submit} type='submit'>
        Подтвердить
      </button>
      <p className={style.errorPassword}>{errors.policy?.message || ''}</p>
    </form>
  );
};
