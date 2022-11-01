import style from './Location2.module.css';
import { ReactComponent as SearchSvg } from '../img/search.svg';
import { TextLocation } from './TextLocation/TextLocation';

export const Location2 = () => {

  return (
    <div className={style.overlay}>
        
        <TextLocation />
    </div>
  );
};
