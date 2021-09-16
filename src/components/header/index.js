import s from './style.module.css';
import Btn from '../btn'

const Header = ({title, descr, onClickBtn}) => {
    return (
        <header className={s.root}> 
            <div className={s.forest}></div>
            <div className={s.container}>
                <h1>{ title }</h1>
                <p>{ descr }</p>
                <Btn 
                    text="Start Game"
                    route="game"
                />
            </div>
        </header>
    )
}

export default Header;