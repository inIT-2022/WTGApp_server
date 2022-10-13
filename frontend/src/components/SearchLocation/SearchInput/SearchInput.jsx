import style from './SearchInput.module.css';
import { useState, useEffect } from 'react';

{ /* Здесь location - это наши локации, searchText, listData - весь список мест */ }

const filterSearch = (searchText, listData) => {
  if (!searchText) {
    return listData;
  }
    return listData.filter(({evens}) => {
      evens.toLowerCase().includes(searchText.toLowerCase());
    });
};

const data = MOCK_DATA;

{ /* const data = 'нащ файл с данными json'; */}

export const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState(data);
  let searchText =  e.target.value.trim(); 

    useEffect(() => {
      { /* задержка функции поиска, чтобы юзер ввел больше букв*/ }
    const Debounce = setTimeout(() => {
      const filterSearchLocation = filterSearch(search, data);
      setList(filterSearchLocation);
    }, 300);

    return () => clearTimeout(Debounce);
  }, [search]);

  return (
    <div>
       <input
          autoFocus
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className={style.search}
          value={search}
        />
    </div>
  )
}