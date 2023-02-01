import React from 'react';

import Spinner from '../../Spinner/Spinner';

import Slider from 'react-slick';

import SectionSearch from '../../SectionSearch';
import CardMore from '../../CardMore';
import CardMainLocation from '../../CardMainLocation';
import Layout from '../../../Layouts/Layout';
import SectionTitle from '../../SectionTitle';

import style from './MainLocation.module.css';
import './slick.css';
import './slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../../store/locations/locationsAction';

export const MainLocation = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.data);
  const loading = useSelector((state) => state.locations.loading);
  React.useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1125,
        settings: {
          slidesToShow: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          infinite: true,
        },
      },

      {
        breakpoint: 870,
        settings: 'unslick', // destroys slick
      },
    ],
  };

  return (
    <section className={style.location} id='locations'>
      <Layout>
        <SectionTitle text={'рекомендуемые локации'} />
        <SectionSearch
          text={'места куда вам захочется вернуться :)'}
          placeholder={'Отыщи свой уголок'}
          section={'locations'}
        />
        <div className={style.sliderWrapper}>
          <div className={style.slider}>
            <Slider {...settings}>
              {!loading ? (
                locations
                  .slice(0, 5)
                  .map((location) => (
                    <CardMainLocation key={location.id} loc={location} />
                  ))
              ) : (
                <Spinner />
              )}
              {!loading ? <CardMore /> : null}
            </Slider>
          </div>
        </div>
      </Layout>
    </section>
  );
};
