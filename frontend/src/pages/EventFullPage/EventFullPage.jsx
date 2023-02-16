import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from '../../Layouts/Layout/Layout';
import Slider from '../../components/Slider/Slider';
import BtnHome from '../../components/BtnHome';

import { API_URI } from '../../assets/const';
import { MONTHES } from '../../assets/const';
import { getDateParameters } from '../../utils/getDateParameters';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import { resetEvents } from '../../store/events/eventsSlice';

import style from './EventFullPage.module.css';

export const EventFullPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchValue = useSelector((state) => state.search.searchValue);

  const [eventPage, setEventPage] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    const fetchEventPage = async (page) => {
      const { data } = await axios(`${API_URI}/api/v1/events/${page}`);
      setEventPage(data);
    };
    fetchEventPage(id);
  }, [id]);

  const {
    description,
    startDatetime,
    title,
    price,
    linkEventSite,
    linkImage,
    location,
  } = eventPage;

  const { startTime, day, year, month } = getDateParameters(startDatetime);

  const images = linkImage
    ? linkImage?.split('|')
    : [
        'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=',
      ];

  const adress = location?.address || '';

  const handleClickTopEvents = () => {
    if (!searchValue) {
      dispatch(resetEvents());
    }
    navigate('/events');
  };

  return (
    <section className={style.event}>
      <Layout>
        <div className={style.nav}>
          <BtnHome />

          <button className={style.navText} onClick={handleClickTopEvents}>
            / Top events /
          </button>
          <p className={style.navText}> Event</p>
        </div>

        <h4 className={style.title}>{title}</h4>

        <div className={style.wrapper}>
          <div className={style.leftContent}>
            {/* <p className={style.distance}>Расстояние 25,7 км</p> */}
            <div className={style.sliderWrapper}>
              <Slider items={images} />
            </div>
            <div className={style.enter}>
              <p className={style.date}>
                {day || ''} {MONTHES[month] || ''} {year || ''}
                {startTime ? <span> Начало в {startTime}</span> : null}
              </p>
              <p className={style.censure}>Без возростных ограничений</p>
              {price ? (
                <p className={style.price}>Цена: {price} рублей</p>
              ) : null}
            </div>
          </div>

          <div className={style.rightContent}>
            <p className={style.adress}>​{adress}</p>

            <div className={style.linksWrapper}>
              {location && (
                <Link to={`/locations/${location.id}`} className={style.link}>
                  Локация
                </Link>
              )}
              <a
                href={linkEventSite}
                className={style.link}
                rel='noreferrer'
                target='_blank'
              >
                Источник
              </a>
            </div>

            <div className={style.description}>
              <ReactMarkdown children={description} />
            </div>
          </div>
        </div>
      </Layout>
    </section>
  );
};
