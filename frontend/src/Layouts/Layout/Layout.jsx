import style from './Layout.module.css';

export const Layout = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};
