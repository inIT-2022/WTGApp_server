import style from './ScrollTop.module.css';

export const ScrollTop = () => {
  return (
    <button
      className={style.root}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      &#8593;
    </button>
  );
};
