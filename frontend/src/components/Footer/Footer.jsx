import style from './Footer.module.css';
import FooterLogo from './img/billboard.png';
import { assignId } from '../../utils/generateRandomID';
import { ReactComponent as TelegramIcon } from './img/telegram-icon.svg';
import { ReactComponent as TwitterIcon } from './img/twitter-icon.svg';
import { ReactComponent as MailIcon } from './img/mail-icon.svg';
import { ReactComponent as PhoneIcon } from './img/phone-icon.svg';
import { Link } from 'react-router-dom';
import { Layout } from '../../Layouts/Layout/Layout';

const MENU = [
  { value: 'Главная', link: '' },
  { value: 'События', link: 'events' },
  { value: 'Локации', link: 'locations' },
  { value: 'Маршруты', link: 'routes' },
  { value: 'Отдых', link: 'rest' },
  { value: 'О нас', link: 'team' },
].map(assignId);

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <Layout>
        <div className={style.footer__columns}>
          <div className={style.footer__colum}>
            <div className={style.logo__item}>
              <img
                className={style.logo__item_img}
                src={FooterLogo}
                alt='Логотип приложения WTG'
              />
              <p className={style.logo__item_text}></p>
            </div>
          </div>
          <div className={style.footer__column}>
            <h3 className={style.footer__title}>Выбор за Вами:</h3>
            <ul className={style.footer__list}>
              {MENU.map(({ value, id, link }) => {
                return (
                  <li key={id} className={style.footer__item}>
                    <Link to={`/${link}`} className={style.footer__link}>
                      {value}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={style.footer__column}>
            <h3 className={style.footer__title}>Адрес организации:</h3>
            <p className={style.footer__description}>
              г.&nbsp;Краснодар, ул.&nbsp;Производственная 104/3 1&nbsp;этаж
            </p>
          </div>
          <div className={`${style.footer__column} ${style.contacts}`}>
            <h3 className={style.footer__title}>Контакты:</h3>
            <div
              className={`${style.contacts__list} ${style.footer__link_box}`}
            >
              <a className={style.contacts__link} href='tel:+7800757575'>
                <PhoneIcon width={20} height={20} />
                <span className={style.contacts__link_text}>+780075757577</span>
              </a>

              <a
                className={style.contacts__link}
                href='mailto:ETrans@gmail.com'
              >
                <MailIcon width={24} height={24} />
                <span className={style.contacts__link_text}>wtg@gmail.com</span>
              </a>
            </div>

            <ul className={style.contacts__social}>
              <li className={style.social__item}>
                <a className={style.footer__link_social} href='#'>
                  <TwitterIcon width={46} height={46} />
                </a>
              </li>
              <li className={style.social__item}>
                <a className={style.footer__link_social} href='#'>
                  <TelegramIcon width={46} height={46} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className={style.footer__copyright}>© City Events, 2022</p>
      </Layout>
    </footer>
  );
};
