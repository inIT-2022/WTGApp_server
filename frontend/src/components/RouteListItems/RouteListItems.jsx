import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Reorder } from 'framer-motion';

import { ReactComponent as Plus } from './img/add.svg';
import { ReactComponent as Del } from './img/delete.svg';
import { ReactComponent as Start } from './img/play.svg';
import { ReactComponent as Finish } from './img/stop.svg';
import { ReactComponent as Marker } from './img/marker.svg';

import {
  deleteRoutePoint,
  setLocationsByCategory,
} from '../../store/routes/routesSlice';

import { fetchRouteMap } from '../../store/routes/routesAction';

import style from './RouteListItems.module.css';
import { useEffect, useState } from 'react';

export const RouteListItems = () => {
  const dispatch = useDispatch();

  const locationsByCategory = useSelector(
    (state) => state.routes.locationsByCategory,
  );

  const [points, setPoints] = useState(locationsByCategory);

  const handleClickDelete = (id) => {
    dispatch(deleteRoutePoint(id));
    dispatch(fetchRouteMap());
  };

  const handleDrop = () => {
    dispatch(setLocationsByCategory(points));
    dispatch(fetchRouteMap());
  };

  useEffect(() => {
    setPoints(locationsByCategory);
  }, [locationsByCategory]);

  return (
    <Reorder.Group
      as='ul'
      axys='y'
      values={points}
      onReorder={setPoints}
      className={style.list}
    >
      {points
        ? points.map((point, i, arr) => (
            <Reorder.Item
              as='li'
              className={style.item}
              key={point.id}
              value={point}
              whileDrag={{ scale: 1.1, backgroundColor: 'lightblue' }}
              onDragEnd={handleDrop}
            >
              <div className={style.titleWrapper}>
                {i === 0 ? (
                  <Start className={style.marker} />
                ) : i === arr.length - 1 ? (
                  <Finish className={style.marker} />
                ) : (
                  <div className={style.marker}>
                    <Marker />
                    <span className={style.number}>{i + 1}</span>
                  </div>
                )}
                <Link className={style.title} to={`/locations/${point.id}`}>
                  {point.title}
                </Link>
              </div>
              <div className={style.iconsWrapper}>
                <button onClick={() => handleClickDelete(point.id)}>
                  <Del />
                </button>
              </div>
            </Reorder.Item>
          ))
        : null}
    </Reorder.Group>
  );
};
