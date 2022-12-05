import style from './Routespage.module.css';
import slide_1 from './img/slide_1.jpg';
import slide_2 from './img/slide_2.jpg';
import slide_3 from './img/slide_3.jpg';
import { Link } from 'react-router-dom';
import { ReactComponent as Shortcut } from './img/shortcut.svg';
import SearchRoutes from './SearchRoutes';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Routes = ({ searchValue, setSearchValue }) => {
  const authData = useSelector((state) => state.auth.data);
  const [isShowMessage, setIsShowMessage] = useState(false);

  const showMessage = () => {
    setIsShowMessage(!isShowMessage);
    setTimeout(() => {
      setIsShowMessage(false);
    }, 1500);
  };

  return (
    <>
      <div className={style.wrapper} id='routes'>
        {!authData?.login ? (
          <div className={style.authBlure} onClick={showMessage}>
            {isShowMessage ? (
              <p className={style.message}>Необходимо авторизоваться </p>
            ) : null}
          </div>
        ) : null}
        <Shortcut className={style.svg} width={85} height={85} />
        <h2 className={style.title}>яркие маршруты</h2>
      </div>
      <SearchRoutes searchValue={searchValue} setSearchValue={setSearchValue} />
      <ul className={style.gallery}>
        <li className={style.img_wrapper}>
          <Link to='/routespages/1'>
            <h3>Пеший</h3>
            <img className={style.img} src={slide_1} alt='Пеший'></img>
          </Link>
        </li>

        <li className={style.img_wrapper}>
          <Link to='/routespages/2'>
            <h3>Вело</h3>
            <img className={style.img} src={slide_2} alt='Вело'></img>{' '}
          </Link>
        </li>

        <li className={style.img_wrapper}>
          <Link to='routespages/3'>
            <h3>Авто</h3>
            <img className={style.img} src={slide_3} alt='Авто'></img>{' '}
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Routes;
