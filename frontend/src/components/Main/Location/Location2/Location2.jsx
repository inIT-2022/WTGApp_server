import style from './Location2.module.css';
import { TextLocation } from './TextLocation/TextLocation';

export const Location2 = () => {
  return (
    <div className={style.overlay}>
      <TextLocation />
    </div>
  );
};
