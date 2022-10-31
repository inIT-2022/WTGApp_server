import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../../Layouts/Layout/Layout';
import style from './EventFullPage.module.css';
import { API_URI } from '../../assets/const';
import axios from 'axios';

export const EventFullPage = () => {
  const [eventPage, setEventPage] = React.useState([]);
  const { id } = useParams();
  React.useEffect(() => {
    const fetchEventPage = async (page) => {
      const { data } = await axios(`${API_URI}/events/${page}`);
      setEventPage(data);
    };
    fetchEventPage(id);
  }, [id]);
  const { description, linkImage, startDatetime, title, price, linkEventSite } =
    eventPage;

  const cost = price ? `Цена: ${price} рублей` : 'Вход бесплатный';

  return (
    <Layout>
      <div className={style.nav}>
        <Link to='/'>
          <svg
            width='36'
            height='36'
            viewBox='0 2 28 28'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M25.1475 9.52931L14.6475 2.52931C14.4558 2.40146 14.2304 2.33326 14 2.33331C13.7699 2.33349 13.5451 2.40168 13.3537 2.52931L2.85366 9.52931C2.6454 9.66818 2.48733 9.87034 2.40279 10.1059C2.31824 10.3415 2.31172 10.5981 2.38417 10.8377C2.45663 11.0773 2.60422 11.2872 2.80514 11.4365C3.00607 11.5858 3.24968 11.6665 3.49999 11.6666H4.66666V24.5C4.66666 24.8094 4.78957 25.1061 5.00837 25.3249C5.22716 25.5437 5.5239 25.6666 5.83332 25.6666H22.1667C22.4761 25.6666 22.7728 25.5437 22.9916 25.3249C23.2104 25.1061 23.3333 24.8094 23.3333 24.5V11.6666H24.5C24.7505 11.667 24.9945 11.5866 25.1958 11.4375C25.3971 11.2884 25.5451 11.0785 25.6178 10.8388C25.6906 10.5991 25.6842 10.3423 25.5997 10.1065C25.5152 9.87066 25.3571 9.66829 25.1487 9.52931H25.1475ZM21 23.3333H6.99999V9.56665L14 4.89998L21 9.56665V23.3333Z'
              fill='black'
            />
          </svg>
        </Link>

        <Link to='/events' className={style.navText}>
          / Top events /
        </Link>
        <p className={style.navText}> Event</p>
      </div>
      <h4 className={style.title}>{title}</h4>
      <div className={style.cart}>
        <div className={style.leftContent}>
          <p className={style.distance}>Расстояние 25,7 км</p>
          <img
            src={linkImage ? linkImage.split('|')[0] : null}
            alt={`изображение ${title}`}
            width={540}
            height={418}
          />
          <div className={style.enter}>
            <p className={style.date}>{startDatetime}</p>
            <p className={style.censure}>Без возростных ограничений</p>
            <p className={style.price}>{cost}</p>
          </div>
        </div>
        <div className={style.rightContent}>
          <div className={style.rightHeader}>
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15.9999 22.6667L5.33325 29.3334V5.33341C5.33325 4.62617 5.6142 3.94789 6.1143 3.4478C6.6144 2.9477 7.29267 2.66675 7.99992 2.66675H23.9999C24.7072 2.66675 25.3854 2.9477 25.8855 3.4478C26.3856 3.94789 26.6666 4.62617 26.6666 5.33341V29.3334L15.9999 22.6667Z'
                stroke='black'
              />
            </svg>

            <span className={style.review}>Отзывы 999</span>
          </div>
          <p className={style.adress}>
            ​Горная, 1 <br />
            ДНП Предгорье, х. Молькин, Горячий Ключ городской округ,
            Краснодарский край
          </p>
          <a
            href={linkEventSite}
            className={style.source}
            rel='noreferrer'
            target='_blank'
          >
            Источник
          </a>

          <p className={style.description}>{description}</p>
        </div>
      </div>
    </Layout>
  );
};
