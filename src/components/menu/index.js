import s from './style.module.css';
import cn from 'classnames';

const Menu = ({ isActive }) => {
    return (
        <div className={cn(s.menuContainer, { [s.active]: isActive }, { [s.deactive]: !isActive })}>
            <div className={s.overlay} />
            <div className={s.menuItems}>
                <ul>
                    <li>
                        <a href="#welcome">
                            HOME
                        </a>
                    </li>
                    <li>
                        <a href="#game">
                            GAME
                        </a>
                    </li>
                    <li>
                        <a href="#about">
                            ABOUT
                        </a>
                    </li>
                    <li>
                        <a href="#contact">
                            CONTACT
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Menu;