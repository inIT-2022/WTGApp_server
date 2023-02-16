import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchEvents,
  fetchSearchEvents,
} from '../../store/events/eventsAction';

import Skeleton from '../../components/Skeleton/Skeleton';
import CardEvent from '../../components/CardEvent';
import Layout from '../../Layouts/Layout';
import BtnHome from '../../components/BtnHome';

import style from './Events.module.css';
import { useObserver } from '../../hooks/useObserver';
import { setCurrentPageEvent } from '../../store/events/eventsSlice';

export const Events = () => {
  const dispatch = useDispatch();

  const searchValue = useSelector((state) => state.search.searchValue);
  const currentPage = useSelector((state) => state.events.currentPage);
  const events = useSelector((state) => state.events.data);
  const loading = useSelector((state) => state.events.loading);

  const lastElement = React.useRef();

  useObserver(lastElement, !searchValue && events.length > 9, loading, () => {
    dispatch(setCurrentPageEvent(currentPage + 1));
  });

  React.useEffect(() => {
    if (searchValue && events) return;

    if (searchValue) {
      dispatch(fetchSearchEvents(searchValue));
    } else dispatch(fetchEvents());
  }, [currentPage]);

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

        {events.length > 0 ? (
          events.map((event) => (
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
        ) : !loading ? (
          <>
            <span>Ничего не найдено</span>
          </>
        ) : null}
        <div style={{ height: 20 }} ref={lastElement}></div>
      </Layout>
    </section>
  );
};
