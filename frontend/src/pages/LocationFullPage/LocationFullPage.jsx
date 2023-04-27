import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useFullPageById } from '../../hooks/useFullPageById';

import LocEventsCard from '../../components/LocEventsCard';
import BtnHome from '../../components/BtnHome';
import Layout from '../../Layouts/Layout';
import Slider from '../../components/Slider/Slider';

import style from './LocationFullPage.module.css';
import { useEventsByIdLocation } from '../../hooks/useEventsByIdLocation.js';

export const LocationFullPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showFullDescr, setShowFullDescr] = React.useState(false);

  const eventsByIdLocation = useEventsByIdLocation({ id });

  const locationPageData = useFullPageById({ id, page: 'locations' });
  const {
    address,
    description,
    fullDescription,
    linkImage,
    title,
    price,
    linkSite,
  } = locationPageData;

  const images = linkImage
    ? linkImage.split('|').slice(0, 5)
    : [
        'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=',
      ];

  const handleShowFullDescr = () => {
    setShowFullDescr(!showFullDescr);
  };

  const handleClickTopLoc = () => {
    navigate('/locations');
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={style.location}>
      <Layout>
        <div className={style.nav}>
          <BtnHome />

          <button className={style.navText} onClick={handleClickTopLoc}>
            / Топ локаций /
          </button>
          <p className={style.navText}> Локация</p>
        </div>
        <h4 className={style.title}>{title}</h4>

        <div className={style.wrapper}>
          <div className={style.leftContent}>
            {/* <p className={style.distance}>Расстояние 15,3 км</p> */}
            <div className={style.sliderWrapper}>
              <Slider items={images} />
            </div>

            <div className={style.enter}>
              <p className={style.date}>График работы: не указан</p>
              <p className={style.censure}>Без возрастных ограничений</p>
              <p>
                {price ? (
                  <>
                    <span className={style.price}>Цена: </span>
                    <span>{price} рублей</span>{' '}
                  </>
                ) : null}
              </p>
            </div>
          </div>

          <div className={style.rightContent}>
            <p className={style.adress}>{address}</p>
            <div className={style.sourceWrapper}>
              <a
                href={linkSite}
                className={style.source}
                rel='noreferrer'
                target='_blank'
              >
                Источник
              </a>
            </div>

            {description || fullDescription ? (
              <div className={style.description}>
                <ReactMarkdown
                  children={description ? description : fullDescription}
                />
              </div>
            ) : null}

            {showFullDescr && (
              <div className={style.description}>
                <ReactMarkdown children={fullDescription} />
              </div>
            )}
            {fullDescription && description ? (
              <div className={style.moreInfoWrapper}>
                <button
                  className={style.moreInfo}
                  onClick={handleShowFullDescr}
                >
                  {showFullDescr ? 'Свернуть' : 'Больше информации'}
                </button>
              </div>
            ) : null}
            {eventsByIdLocation.length ? (
              <div className={style.locEvents}>
                <span>События в данной локации</span>
                <div className={style.locEventsWrapper}>
                  {eventsByIdLocation.map((item) => (
                    <LocEventsCard key={item.id} event={item} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Layout>
    </section>
  );
};
