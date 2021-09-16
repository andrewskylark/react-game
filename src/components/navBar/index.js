import s from './style.module.css';
import cn from 'classnames';

const NavBar = ({ onClickMenu, isOpened, bgActive = false }) => {
    const onClick = () => {
        onClickMenu && onClickMenu();
        isOpened={isOpened}
    }
    return (
        <nav className={cn(s.root, {
            [s.bgActive]: bgActive
        })}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                    LOGO
                </p>
                <div 
                    onClick={onClick}
                    className={cn(s.menuButton, {
                        [s.active]: isOpened === true,
                        [s.deactive]: !isOpened === false 
                    })}>
                    <span />
                </div>
            </div>
        </nav>
    )
}

export default NavBar;