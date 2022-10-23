import style from './SearchRoutes.module.css';
import { ReactComponent as SearchSvg} from '../img/search.svg';
import { ReactComponent as SearchClose } from '../img/searchClose.svg';

export const SearchRoutes = ({ searchValue, setSearchValue }) => {
  return (
    <>
      <div className={style.wrapperInput}>
        <p className={style.text}>которые стоит пройти</p>
        <input 
          type="text" 
          name="name" 
          className={style.search}
          placeholder="Отыщи свой путь" 
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        >
        </input>
        <SearchSvg className={style.svgSearch} />
        {
          searchValue && <SearchClose className={style.svgClose} onClick={() => setSearchValue('')} />
        }
    
      </div>
    </>
  );
};
