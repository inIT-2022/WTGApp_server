import style from './NotFound.module.css';

export const NotFound = () => (
  <div className={style.root}>
    <h1>
      <span>😕</span>
      <br />
      Ничего не найдено
    </h1>
    <p className={style.description}>
      К сожаления данная страница отсутствует(
    </p>
  </div>
);
