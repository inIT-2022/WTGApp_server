import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../components/Event/Event';
import { Layout } from '../../Layouts/Layout/Layout';
import style from './Events.module.css';
import { API_URI } from '../../assets/const';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';

export const Events = () => {
  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios(`${API_URI}/events`);
      setEvents(data);
    };
    fetchEvents();
  }, []);

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

        <h2 className={style.navText}>/ Top events /</h2>
      </div>
      {events.length > 0 ? (
        events.map((event) => (
          <Event
            key={event.id}
            title={event.title}
            description={event.description}
            date={event.startDatetime}
            source={event.linkEventSite}
            id={event.id}
            img={event.location.linkImage}
          />
        ))
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};
