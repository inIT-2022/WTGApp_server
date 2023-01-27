import style from './SectionSearch.module.css';
import { ReactComponent as SearchSvg } from './img/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearch, setSearchValue } from '../../store/search/searchSlice';
import { fetchSearchLocations } from '../../store/search/searchAction';
import { useNavigate } from 'react-router-dom';

export const SectionSearch = ({ text, placeholder, section }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchValue = useSelector((state) => state.search.searchValue);

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (section === 'locations') {
      dispatch(fetchSearchLocations(searchValue));
      navigate('/locations');
    }
  };

  const handleClickClose = () => {
    dispatch(clearSearch());
  };

  return (
    <div className={style.wrapper}>
      <p className={style.text}>{text}</p>
      <form className={style.form} onSubmit={handlerSubmit}>
        <input
          type='text'
          name='name'
          className={style.input}
          placeholder={placeholder}
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
          value={searchValue}
        ></input>
        {searchValue && (
          <button
            className={style.buttonClose}
            type='button'
            onClick={handleClickClose}
          >
            &#10008;
          </button>
        )}
        <button>
          <SearchSvg className={style.svgSearch} />
        </button>
      </form>
    </div>
  );
};
