import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MONTHES } from '../../assets/const';
import { getDateParameters } from '../../utils/getDateParameters';
import ReactMarkdown from 'react-markdown';
import { useFullPageById } from '../../hooks/useFullPageById';

import { Layout } from '../../Layouts/Layout/Layout';
import Slider from '../../components/Slider/Slider';
import BtnHome from '../../components/BtnHome';

import style from './EventFullPage.module.css';

export const EventFullPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const eventPageData = useFullPageById({ id, page: 'events' });
  const {
    description,
    startDatetime,
    title,
    price,
    linkEventSite,
    linkImage,
    location,
  } = eventPageData;

  const { startTime, day, year, month } = getDateParameters(startDatetime);

  const images = linkImage
    ? linkImage?.split('|')
    : [
        'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=',
      ];

  const adress = location?.address || '';

  const handleClickTopEvents = () => {
    navigate('/events');
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={style.event}>
      <Layout>
        <div className={style.nav}>
          <BtnHome />

          <button className={style.navText} onClick={handleClickTopEvents}>
            / Топ событий /
          </button>
          <p className={style.navText}> Событие</p>
        </div>

        <h4 className={style.title}>{title}</h4>

        <div className={style.wrapper}>
          <div className={style.leftContent}>
            <div className={style.sliderWrapper}>
              <Slider items={images} />
            </div>
            <div className={style.enter}>
              <p className={style.date}>
                {day || ''} {MONTHES[month] || ''} {year || ''}
                {startTime ? <span> Начало в {startTime}</span> : null}
              </p>
              <p className={style.censure}>Без возрастных ограничений</p>
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
