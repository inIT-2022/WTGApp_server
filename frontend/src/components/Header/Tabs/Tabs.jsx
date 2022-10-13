import { assignId } from '../../../utils/generateRandomID';
import style from './Tabs.module.css';
import Container from './../../Container/Container';
import { Link } from 'react-router-dom';

const MENU = [
  { value: 'Главная', link: '' },
  { value: 'События', link: 'events' },
  { value: 'Локации', link: 'locations' },
  { value: 'Маршруты', link: 'routes' },
  { value: 'Отдых', link: 'rest' },
  { value: 'О нас', link: 'team' },
].map(assignId);

export const Tabs = () => {
  return (
    <Container>
      <nav className={style.header__navigation}>
        <ul className={style.navigation__list}>
          {MENU.map(({ value, id, link }) => {
            return (
              <li key={id} className={style.navigation__link}>
                <Link to={`/${link}`}>{value}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Container>
  );
};
