import noPhoto from '../../img/nophoto.jpg';

import style from './CardRouteLocation.module.css';

export const CardRouteLocation = ({ location }) => {
  // const dispatch = useDispatch();

  const { title, linkImage } = location;

  const imgLinks = linkImage ? linkImage.split('|') : [];

  const handleAdd = () => {};
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
