import s from './style.module.css';
import cn from 'classnames';
import {Link} from 'react-router-dom'

const MENUITEMS = [
    {
        title: "HOME",
        to: "/"
    },
    {
        title: "GAME",
        to: "/game"
    },
    {
        title: "ABOUT",
        to: "/about"
    },
    {
        title: "CONTACTS",
        to: "/contacts"
    },
]

const Menu = ({ onClickLink, isOpened }) => {
    const onClick = () => {
        onClickLink && onClickLink();
        isOpened={isOpened}
    }
    return (
        <div className={cn(s.menuContainer, { 
            [s.active]: isOpened === true, 
            [s.deactive]: !isOpened === false 
        })}>
            <div className={s.overlay} />
            <div className={s.menuItems}>
                <ul>
                    {
                        MENUITEMS.map(({title, to}, index) => (
                            <li key={index} onClick={onClick}>
                                <Link to={to}>
                                    {title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Menu;