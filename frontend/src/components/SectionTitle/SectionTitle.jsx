import style from './SectionTitle.module.css';

export const SectionTitle = ({ text }) => {
  return (
    <>
      <h2 className={style.title}>{text}</h2>
    </>
  );
};
