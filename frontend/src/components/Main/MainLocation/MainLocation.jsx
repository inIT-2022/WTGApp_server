import React from 'react';

import { ReactComponent as Shortcut } from './img/shortcut.svg';
import Spinner from '../../Spinner/Spinner';

import { API_URI } from '../../../assets/const';
import axios from 'axios';
import Slider from 'react-slick';

import { SearchLocation } from './SearchLocation/SearchLocation';
import { CardMore } from '../../CardMore/CardMore';
import { CardMainLocation } from '../../CardMainLocation/CardMainLocation';

import style from './MainLocation.module.css';
import './slick.css';
import './slick-theme.css';

export const MainLocation = ({ searchValue, setSearchValue }) => {
  const [locations, setLocations] = React.useState([]);

  React.useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios(`${API_URI}/locations`);
      setLocations(data);
    };
    fetchEvents();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

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
      <div className={style.slider}>
        <Slider {...settings}>
          {locations.length ? (
            locations
              .slice(0, 6)
              .map((location) => (
                <CardMainLocation key={location.id} loc={location} />
              ))
          ) : (
            <Spinner />
          )}
          <CardMore />
        </Slider>
      </div>
    </section>
  );
};
