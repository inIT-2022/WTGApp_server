import React from 'react';

import { SearchLocation } from './SearchLocation/SearchLocation';
import { ReactComponent as Shortcut } from './img/shortcut.svg';
import Spinner from '../../../components/Spinner/Spinner';

import { API_URI } from '../../../assets/const';
import axios from 'axios';
import Slider from 'react-slick';

import style from './Location.module.css';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import './slick.css';
import './slick-theme.css';
import { Link } from 'react-router-dom';
import { CardMore } from '../../CardMore/CardMore';

export const Location = ({ searchValue, setSearchValue }) => {
  const [location, setLocation] = React.useState([]);
  console.log('location: ', location);

  React.useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios(`${API_URI}/locations`);
      setLocation(data);
    };
    fetchEvents();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
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
          {location.length ? (
            location.slice(0, 7).map((loc) => (
              <Link
                to={`locations/${loc.id}`}
                key={loc.id}
                className={style.locWrap}
              >
                <img
                  src={loc.linkImage.split('|')[0]}
                  alt='123'
                  className={style.locImg}
                />
              </Link>
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
