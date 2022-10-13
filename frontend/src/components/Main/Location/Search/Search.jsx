import style from './Search.module.css';
import { ReactComponent as Shortcut } from '../img/shortcut.svg';
import { ReactComponent as SearchSvg} from '../img/search.svg';

export const Search = () => {
  return (
    <>
      <div className={style.wrapper}>
        <Shortcut className={style.svg} width={85} height={85}/>
        <h2 className={style.title}>рекомендуемые локации</h2>
      </div>
      <div className={style.wrapper}>
        <input 
          type="text" 
          name="name" 
          className={style.search}
          placeholder="отыщи свой уголок" 
        >
        </input>
        <SearchSvg className={style.svgSearch} width={40} height={40}/>
        <p className={style.text}>места куда вам захочется вернуться :)</p>
      </div>
    </>
  )
}