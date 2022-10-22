import style from './Routes.module.css';
import slide_1 from './img/slide_1.jpg';
import slide_2 from './img/slide_2.jpg';
import slide_3 from './img/slide_3.jpg';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';
import { ReactComponent as Shortcut } from './img/shortcut.svg';
import SearchRoutes from './SearchRoutes';
import Line from '../Line';

const Routes = ({ searchValue, setSearchValue }) => {

  return (
    <>
      <Line />
      <Container>
        <div className={style.wrapper}>
          <Shortcut className={style.svg} width={85} height={85}/>
          <h2 className={style.title}>яркие маршруты</h2>
        </div>
        <SearchRoutes searchValue={searchValue} setSearchValue={setSearchValue} />
        <ul className={style.gallery}>
          
          <li className={style.img_wrapper}>
            <Link to='/routerspage/1'>
              <h3>Пеший</h3>
                <img
                  className={style.img}
                  src={slide_1}
                  alt='Пеший'
                ></img>
            </Link>
          </li>
          
          <li className={style.img_wrapper}>
            <Link to='/routers/2'>
              <h3>Вело</h3>
                <img
                  className={style.img}
                  src={slide_2}
                  alt='Вело'
                ></img>{' '}
            </Link>
          </li>
          
          <li className={style.img_wrapper}>
            <Link to='/routers/3'>
              <h3>Авто</h3>
                <img
                  className={style.img}
                  src={slide_3}
                  alt='Авто'
                ></img>{' '}
            </Link>
          </li>  
        </ul>
      </Container>
    </>
  );
};

export default Routes;
