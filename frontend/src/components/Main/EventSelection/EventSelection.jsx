import style from './EventSelection.module.css';
import Line from './../../Line';
import Container from '../../Container/Container';
import { ReactComponent as Shortcut } from './img/shortcut.svg';

export const EventSelection = () => (
  <Container>
    <Line />
    <div className={style.wrapper}>
      <Shortcut className={style.svg} width={85} height={85} />
      <h2 className={style.title}>отдых от ИИ</h2>
    </div>
    <p className={style.description}>
      наш ИИ поможет подобрать оптимальный отдых именно Вам
    </p>
    <div className={style.wrapperText}>
      <p className={style.text}>
        Не знаете где провести выходные или набраться впечатлений, не
        волнуйтесь!
      </p>
      <p className={style.titleText}>Мы сделаем это за Вас!</p>
       <button className={style.button}>Подобрать</button>
    </div>
  </Container>
);
