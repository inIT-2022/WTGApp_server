import style from './Accordion.module.css';
import { useState } from 'react';

export const Accordion = () => {
  const [checked, setChecked] = useState(false);

  const changeChecked = () => {
    setChecked(!checked);
  };

  return ( 
    <div className={style.acorcontainer}> 
        <input type="checkbox" name="chacor" id="chacor" checked={checked} />
        <label onClick={changeChecked} for="acor">Ещё отзывы</label>
        {
          checked && (
            <div className={style.acorbody}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          )
        }
        
    </div>
  );
};
