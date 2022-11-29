import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useRef } from 'react';
import { fetchSignupData } from '../../store/signup/signupAction';

import style from './FormRegistration.module.css';

export const FormRegistration = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [agree, setAgree] = useState(false);
  const [showPolicyError, setShowPolicyError] = useState(false);
  const checkRef = useRef(null);
  const signupData = useSelector((state) => state.signup.data);

  const handleAgree = ({ target }) => setAgree(target.checked);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    if (!checkRef?.current?.checked) {
      setShowPolicyError(true);
      return;
    }
    dispatch(fetchSignupData(values));
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
          Фамилия
        </label>
        <p className={style.error}>{errors.lastName?.message || ''}</p>
      </div>

      <div className={style.wrap}>
        <input
          className={style.inputDate}
          type='date'
          id='birthdayDate'
          required
          min='1945-01-01'
          max='2002-01-01'
          aria-invalid={!!errors.birthdayDate}
          {...register('birthdayDate', {
            required: {
              value: true,
              message: 'Заполните поле',
            },
          })}
        />
        <label className={style.label} htmlFor='birthdayDate'>
          Дата рождения
        </label>
        <p className={style.error}>{errors.birthdayDate?.message || ''}</p>
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

      <p className={style.errorSubmit}>
        {showPolicyError && !agree
          ? 'Ознакомтесь с политикой безопасности'
          : ''}
        {signupData?.message ? `${signupData.message}` : ''}
      </p>

      <button className={style.submit} type='submit'>
        Подтвердить
      </button>
      <p className={style.errorPassword}>{errors.policy?.message || ''}</p>
    </form>
  );
};
