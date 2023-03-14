import { useDispatch } from 'react-redux';
import noPhoto from '../../img/nophoto.jpg';
import { fetchRouteMap } from '../../store/routes/routesAction';
import {
  addRoutsLocation,
  setIsOpenModalSearchLocation,
} from '../../store/routes/routesSlice';

import style from './CardRouteLocation.module.css';

export const CardRouteLocation = ({ location }) => {
  const dispatch = useDispatch();

  const { title, linkImage } = location;

  const imgLinks = linkImage ? linkImage.split('|') : [];

  const handleAdd = () => {
    dispatch(addRoutsLocation(location));
    dispatch(setIsOpenModalSearchLocation(false));
    dispatch(fetchRouteMap());
  };
  return (
    <li className={style.wrapper}>
      <div className={style.imgWrapper}>
        <img src={imgLinks.length ? imgLinks[0] : noPhoto} alt={title} />
      </div>
      <div className={style.content}>
        <h3 className={style.title}>{title}</h3>
        <button className={style.buttonAdd} onClick={handleAdd}>
          Добавить
        </button>
      </div>
    </li>
  );
};
