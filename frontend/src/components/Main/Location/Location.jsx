import React from 'react';
import { Link } from 'react-router-dom';

import { SearchLocation } from './SearchLocation/SearchLocation';
import { ReactComponent as Shortcut } from './img/shortcut.svg';
import Spinner from '../../../components/Spinner/Spinner';

import { API_URI } from '../../../assets/const';
import axios from 'axios';

import style from './Location.module.css';

export const Location = ({ searchValue, setSearchValue }) => {
  const [location, setLocation] = React.useState([]);

  React.useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios(`${API_URI}/locations`);
      setLocation(data);
    };
    fetchEvents();
  }, []);

  const mainLocations = location.slice(0, 4);

  return (
    <section className={style.location}>
      <div className={style.wrapper} id='locations'>
        <Shortcut className={style.svg} width={85} height={85} />
        <h2 className={style.title}>рекомендуемые локации</h2>
      </div>
      <SearchLocation
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <ul className={style.locations__gallery}>
        {mainLocations.length ? (
          mainLocations.map((loc) => (
            <li key={loc.id} className={style.locations__img_wrapper}>
              <Link to={`/locations/${loc.id}`}>
                <div className={style.blocImg}>
                  <img
                    className={style.locations__img}
                    src={loc.linkImage.split('|')[0]}
                    alt={loc.title}
                  ></img>
                </div>
                <div className={style.blocText}>
                  <div className={style.text}>
                    <p className={style.description}>{loc.title}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <Spinner />
        )}
      </ul>
    </section>
  );
};
