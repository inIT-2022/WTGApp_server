import style from './SectionSearch.module.css';
import { ReactComponent as SearchSvg } from './img/search.svg';

export const SectionSearch = ({ text, placeholder, section }) => {
  return (
    <div className={style.wrapper}>
      <p className={style.text}>{text}</p>
      <form className={style.form}>
        <input
          type='text'
          name='name'
          className={style.input}
          placeholder={placeholder}
        ></input>
        <SearchSvg className={style.svgSearch} />
      </form>
    </div>
  );
};
