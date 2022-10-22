import style from './Location.module.css';
import slide_1 from './img/slide_1.jpg';
import slide_2 from './img/slide_2.jpg';
import slide_3 from './img/slide_3.jpg';
import slide_4 from './img/slide_4.jpg';
import { SearchLocation } from './SearchLocation/SearchLocation';
import Container from '../../Container/Container';
import { Link } from 'react-router-dom';
import { ReactComponent as Shortcut } from './img/shortcut.svg';

export const Location = ({ searchValue, setSearchValue }) => {

  return (
    <>
      <Container>
        <div className={style.wrapper}>
          <Shortcut className={style.svg} width={85} height={85}/>
          <h2 className={style.title}>рекомендуемые локации</h2>
        </div>
        <SearchLocation searchValue={searchValue} setSearchValue={setSearchValue} />
        <ul className={style.locations__gallery}>
          <li className={style.locations__img_wrapper}>
            <Link to='/locations/1'>
              <div className={style.blocImg}>
                <img
                  className={style.locations__img}
                  src={slide_1}
                  alt='Плато Лаго'
                ></img>
              </div>
              <div className={style.blocText}> 
                <div className={style.text}>
                  <p className={style.description}>Плато Лаго</p>
                </div>
              </div>
            </Link>
            
          </li>
          <li className={style.locations__img_wrapper}>
            <Link to='/locations/2'>
              <div className={style.blocImg}>
                <img
                  className={style.locations__img}
                  src={slide_2}
                  alt='Парк Галицкого'
                ></img>{' '}
              </div>
              <div className={style.blocText}> 
                <div className={style.text}>
                  <p className={style.description}>Парк Галицкого</p>
                </div>
              </div>
            </Link>
          </li>
          <li className={style.locations__img_wrapper}>
            <Link to='/locations/3'>
              <div className={style.blocImg}> 
                <img
                  className={style.locations__img}
                  src={slide_3}
                  alt='Национальный Академический театр оперы и балета'
                ></img>{' '}
              </div>
              <div className={style.blocText}> 
                <div className={style.text}>
                  <p className={style.description}>Национальный Академический театр оперы и балета</p>
                </div>
              </div>
            </Link>
          </li>
          <li className={style.locations__img_wrapper}>
            <Link to='/locations/4'>
              <div className={style.blocImg}>
                <img
                  className={style.locations__img}
                  src={slide_4}
                  alt='Скала-Парус'
                ></img>{' '}
              </div>
              <div className={style.blocText}> 
                <div className={style.text}>
                  <p className={style.description}>Скала-Парус</p>
                </div>
              </div>
            </Link>
          </li>
          
        </ul>
      </Container>
    </>
  );
};


