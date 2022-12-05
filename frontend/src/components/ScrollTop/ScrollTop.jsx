import style from './ScrollTop.module.css';

export const ScrollTop = () => {
  return (
    <button className={style.root} onClick={() => window.scrollTo(0, 0)}>
      &#8593;
    </button>
  );
};
