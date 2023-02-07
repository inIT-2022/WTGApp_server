import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchEvents } from '../../store/events/eventsAction';

import Skeleton from '../../components/Skeleton/Skeleton';
import CardEvent from '../../components/CardEvent';
import Layout from '../../Layouts/Layout';
import BtnHome from '../../components/BtnHome';

import style from './Events.module.css';

export const Events = () => {
  const dispatch = useDispatch();

  const searchEvents = useSelector((state) => state.search.searchEvents);
  const searchValue = useSelector((state) => state.search.searchValue);

  const events = useSelector((state) => state.events.data);
  const loading = useSelector((state) => state.events.loading);

  React.useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const filteredEvents =
    searchEvents.length || searchValue ? searchEvents : events;

  return (
    <section className={style.events}>
      <Layout>
        <div className={style.nav}>
          <BtnHome />

          <h2 className={style.navText}>/ Top events /</h2>
        </div>
        {loading ? (
          <>
            {[...new Array(4)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </>
        ) : null}

        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <CardEvent
              key={event.id}
              title={event.title}
              description={event.description}
              date={event.startDatetime}
              source={event.linkEventSite}
              id={event.id}
              img={event.linkImage}
            />
          ))
        ) : (
          <>
            <span>Ничего не найдено</span>
          </>
        )}
      </Layout>
    </section>
  );
};
