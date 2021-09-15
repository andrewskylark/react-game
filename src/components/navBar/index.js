import s from './style.module.css';
import cn from 'classnames';

const NavBar = ({ onClickBtn, isActive }) => {
    const onClick = (evt) => {
        evt.preventDefault();
        onClickBtn && onClickBtn();
        isActive={isActive}
        console.log(isActive)
    }
    return (
        <nav className={s.root}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                    LOGO
                </p>
                <a href="!#"
                    onClick={onClick}
                    className={cn(s.menuButton, { [s.active]: isActive }, { [s.deactive]: !isActive })}>
                    <span />
                </a>
            </div>
        </nav>
    )
}

export default NavBar;