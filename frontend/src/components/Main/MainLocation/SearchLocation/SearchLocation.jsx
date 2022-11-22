import style from './SearchLocation.module.css';
import { ReactComponent as SearchSvg} from '../img/search.svg';
import { ReactComponent as SearchClose } from '../img/searchClose.svg';

export const SearchLocation = ({ searchValue, setSearchValue }) => {

  return (
    <>
      <div className={style.wrapperInput}>
        <p className={style.text}>места куда вам захочется вернуться :)</p>
        <input 
          type="text" 
          name="name" 
          className={style.search}
          placeholder="Отыщи свой уголок" 
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

