import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as Plus } from './img/add.svg';
import { ReactComponent as Del } from './img/delete.svg';
import { ReactComponent as More } from './img/more.svg';
import { ReactComponent as Start } from './img/play.svg';
import { ReactComponent as Finish } from './img/stop.svg';
import { ReactComponent as Marker } from './img/marker.svg';

import { deleteRoutePoint } from '../../store/routes/routesSlice';
import { fetchRouteMap } from '../../store/routes/routesAction';

import style from './RouteListItems.module.css';

export const RouteListItems = ({ points }) => {
  const dispatch = useDispatch();

  const handleClickDelete = (id) => {
    dispatch(deleteRoutePoint(id));
    dispatch(fetchRouteMap());
  };
  const handleClickMore = (id) => {};

  return (
    <ul className={style.list}>
      {points
        ? points.map(({ id, title }, i, arr) => (
            <li className={style.item} key={id}>
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
                <Link className={style.title} to={`/locations/${id}`}>
                  {title}
                </Link>
              </div>
              <div className={style.iconsWrapper}>
                <button onClick={() => handleClickDelete(id)}>
                  <Del />
                </button>
                <Plus />
                <button onClick={() => handleClickMore(id)}>
                  <More />
                </button>
              </div>
            </li>
          ))
        : null}
    </ul>
  );
};
