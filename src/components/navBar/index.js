import s from './style.module.css';
import cn from 'classnames';

import { ReactComponent as LogoSVG } from '../../assets/pokemon_logo.svg'
import { ReactComponent as LoginSVG } from '../../assets/login.svg'

const NavBar = ({ onClickMenu, onClickLogin, isOpened, bgActive = false }) => {
    const onClick = () => {
        onClickMenu && onClickMenu();
        isOpened = { isOpened }
    }
    return (
        <nav className={cn(s.root, {
            [s.bgActive]: bgActive
        })}>
            <div className={s.navWrapper}>
                <div className={s.brand}>
                    <LogoSVG />
                </div>
                <div className={s.loginAndMenu}>
                    <div className={s.loginWrapper}
                    onClick={onClickLogin}>
                        <LoginSVG />
                    </div>
                    <div
                        onClick={onClick}
                        className={cn(s.menuButton, {
                            [s.active]: isOpened === true,
                            [s.deactive]: !isOpened === false
                        })}>
                        <span />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;