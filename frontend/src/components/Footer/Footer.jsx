import { ReactComponent as TelegramIcon } from './img/telegram-icon.svg';
import { ReactComponent as VkIcon } from './img/vk.svg';
import { ReactComponent as MailIcon } from './img/mail-icon.svg';
import { ReactComponent as PhoneIcon } from './img/phone-icon.svg';
import { ReactComponent as Logo } from './img/logo.svg';
import Layout from '../../Layouts/Layout';

import style from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <Layout>
        <div className={style.container}>
          <div className={style.logo}>
            <Logo className={style.logoIcon} />
            <p className={style.logoText}>WTG LOGO</p>
          </div>

          <div className={style.address}>
            <h3 className={style.addressTitle}>Адрес организации:</h3>
            <p className={style.addressDescription}>
              г. Краснодар, ул. Трубная 104/3 1этаж
            </p>
          </div>

          <div className={style.contacts}>
            <h3 className={style.contactsTitle}>Контакты:</h3>
            <ul className={style.contactsList}>
              <li className={style.contactsItem}>
                <PhoneIcon className={style.iconContacts} />
                <a className={style.contactsLink} href='tel:+89189366579'>
                  +89189366579
                </a>
              </li>

              <li className={style.contactsItem}>
                <MailIcon className={style.iconContacts} />
                <a className={style.contactsLink} href='mailto:wtg@gmail.com'>
                  wtg@gmail.com
                </a>
              </li>
            </ul>

            <ul className={style.contactsSocial}>
              <li className={style.socialItem}>
                <a
                  className={style.socialLink}
                  href='https://vk.ru/wtg_online'
                  rel='noreferrer'
                  target='_blank'
                >
                  <VkIcon className={style.iconSocial} />
                </a>
              </li>
              <li className={style.socialItem}>
                <a
                  className={style.socialLink}
                  href='https://t.me/wtg_online'
                  rel='noreferrer'
                  target='_blank'
                >
                  <TelegramIcon className={style.iconSocial} />
                </a>
              </li>
            </ul>
          </div>

          <p className={style.copyright}>© inIT, 2023</p>
        </div>
      </Layout>
    </footer>
  );
};
