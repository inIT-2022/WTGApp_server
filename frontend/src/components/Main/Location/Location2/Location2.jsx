import style from './Location2.module.css';
import { ReactComponent as SearchSvg } from '../img/search.svg';
import { TextLocation } from './TextLocation/TextLocation';

export const Location2 = () => {

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <div className={style.wrapperH3}>
          <h3 className={style.title}>лОКация</h3>
          <div className={style.wrapper}>
            <input 
              type='text' 
              name='name' 
              className={style.search}
              placeholder='Отыщи свой уголок...'
              ></input>
            <SearchSvg className={style.svgSearch} width={60} height={70} />
          </div>
        </div>
        
        <TextLocation />
      </div>
    </div>
  );
};
