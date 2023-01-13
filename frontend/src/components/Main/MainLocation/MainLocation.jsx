import React from 'react';

import { ReactComponent as Shortcut } from './img/shortcut.svg';
import Spinner from '../../Spinner/Spinner';

import Slider from 'react-slick';

import { SearchLocation } from './SearchLocation/SearchLocation';
import { CardMore } from '../../CardMore/CardMore';
import { CardMainLocation } from '../../CardMainLocation/CardMainLocation';

import style from './MainLocation.module.css';
import './slick.css';
import './slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../../store/locations/locationsAction';

export const MainLocation = ({ searchValue, setSearchValue }) => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.data);

  React.useEffect(() => {
    dispatch(fetchLocations());
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
