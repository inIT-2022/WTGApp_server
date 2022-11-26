import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { Layout } from '../../Layouts/Layout/Layout';
import Slider from '../../components/Slider/Slider';

import { API_URI } from '../../assets/const';
import { monthes } from '../../assets/const';
import { getDateParameters } from '../../utils/getDateParameters';
import axios from 'axios';

import style from './EventFullPage.module.css';

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

  const { description, startDatetime, title, price, linkEventSite, location } =
    eventPage;

  const cost = price ? `Цена: ${price} рублей` : 'Вход бесплатный';

  const { startTime, day, year, month } = getDateParameters(startDatetime);

  const images = location?.linkImage ? location.linkImage.split('|') : [];

  const adress = location?.address || '';
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
          <p className={style.distance}>Расстояние 25,7 км</p>{' '}
          {<Slider items={images} height={'500px'} />}
          <div className={style.enter}>
            <p className={style.date}>
              {day} {monthes[month]} {year} Начало в {startTime}
            </p>
            <p className={style.censure}>Без возростных ограничений</p>
            <p className={style.price}>{cost}</p>
          </div>
        </div>
        <div className={style.rightContent}>
          <div className={style.rightHeader}>
            <svg
              width='65'
              height='65'
              viewBox='0 0 65 65'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M33.8249 43.9218L32.4999 43.0936L31.1749 43.9218L13.3333 55.0728V10.8334C13.3333 10.0599 13.6405 9.318 14.1875 8.77102C14.7345 8.22404 15.4764 7.91675 16.2499 7.91675H48.7499C49.5235 7.91675 50.2653 8.22404 50.8123 8.77102C51.3593 9.318 51.6666 10.0599 51.6666 10.8334V55.0728L33.8249 43.9218Z'
                stroke='black'
                strokeWidth='5'
              />
              <rect
                x='0.5'
                y='0.5'
                width='64'
                height='64'
                rx='4.5'
                stroke='#D6CCCC'
              />
            </svg>

            <svg
              width='65'
              height='65'
              viewBox='0 0 65 65'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M21.1781 35.8567L44.6224 46.8696C44.6309 46.8757 44.6389 46.8825 44.6463 46.89L45.378 47.632L44.5591 47.281C44.4674 47.2417 44.3793 47.2102 44.2969 47.185L21.0084 36.2403L20.4624 35.7527L21.1781 35.8567ZM46.0008 50.1804L46.4599 48.3287L48.003 47.0745C48.9835 46.2775 50.207 45.8396 51.4706 45.8334L51.4795 45.8333L51.4885 45.8332C52.683 45.8188 53.8522 46.1783 54.8321 46.8615C55.8121 47.5447 56.5538 48.5174 56.9533 49.6432C57.3529 50.769 57.3902 51.9916 57.0602 53.1397C56.7302 54.2878 56.0493 55.304 55.1129 56.0458C54.1765 56.7875 53.0315 57.2178 51.8383 57.2764C50.6451 57.3349 49.4635 57.0187 48.459 56.3721C47.4545 55.7255 46.6775 54.7809 46.2366 53.6706C45.7958 52.5603 45.7134 51.3399 46.0008 50.1804ZM8.86338 35.6472L6.79127 37.0458L8.86338 35.6471C8.2359 34.7176 7.90063 33.6216 7.90063 32.5001C7.90063 31.3785 8.2359 30.2826 8.86338 29.353C9.49086 28.4234 10.3819 27.7026 11.4221 27.2832L10.4871 24.9646L11.4221 27.2832C12.4622 26.8638 13.604 26.7649 14.7008 26.9992C15.7976 27.2335 16.7993 27.7904 17.5773 28.5982L18.7721 29.8389L19.107 31.9884C19.1334 32.1578 19.1521 32.3283 19.163 32.4994C19.1522 32.667 19.1336 32.8341 19.1075 33.0001L18.7669 35.1667L17.5773 36.402C16.7993 37.2098 15.7976 37.7666 14.7008 38.0009C13.604 38.2353 12.4622 38.1364 11.4221 37.7169C10.3819 37.2975 9.49086 36.5767 8.86338 35.6472ZM45.9982 14.7958C45.8937 14.3817 45.8383 13.9567 45.8333 13.5296C45.8357 12.4213 46.1654 11.3383 46.7812 10.4167C47.3993 9.49164 48.2778 8.77067 49.3057 8.34493C50.3335 7.91919 51.4645 7.80779 52.5556 8.02483C53.6468 8.24188 54.6491 8.77761 55.4357 9.56428C56.2224 10.3509 56.7581 11.3532 56.9752 12.4444L59.4271 11.9566L56.9752 12.4444C57.1922 13.5355 57.0808 14.6665 56.6551 15.6943L58.9648 16.6511L56.6551 15.6943C56.2293 16.7222 55.5084 17.6007 54.5833 18.2188L55.8904 20.175L54.5833 18.2188C53.6595 18.836 52.5736 19.1659 51.4627 19.1667C50.1981 19.1612 48.9735 18.7233 47.9921 17.9257L46.2734 16.5287L46.4104 16.4283L45.9982 14.7958ZM44.6054 18.1335L21.2022 29.131L20.4929 29.2193L21.0114 28.7571L44.2847 17.8101C44.5334 17.7333 44.7978 17.6107 45.0526 17.4239L46.0502 16.6924L44.6457 18.0998C44.6333 18.1122 44.6198 18.1235 44.6054 18.1335Z'
                stroke='black'
                strokeWidth='5'
              />
              <rect
                x='0.5'
                y='0.5'
                width='64'
                height='64'
                rx='4.5'
                stroke='#D6CCCC'
              />
            </svg>

            <span className={style.review}>Отзывы 999</span>
          </div>
          <p className={style.adress}>​{adress}</p>
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
