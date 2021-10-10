import s from './style.module.css';
import cn from 'classnames';

import { useSelector } from "react-redux";
import { selectUserLoading, selectUserLocalID } from "../../store/user";

import { ReactComponent as LogoSVG } from '../../assets/pokemon_logo.svg';
import { ReactComponent as LoginSVG } from '../../assets/login.svg';
import { ReactComponent as UserSVG } from '../../assets/user.svg';
import { Link } from 'react-router-dom';

const NavBar = ({ onClickMenu, onClickLogin, isOpened, bgActive = false }) => {
    const isUserLoading = useSelector(selectUserLoading);
    const localId = useSelector(selectUserLocalID);

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
                    {(!isUserLoading && !localId) && (//loading of data finished, but no local ID
                        <div className={s.loginWrapper}
                            onClick={onClickLogin}>
                            <LoginSVG />
                        </div>
                    )}
                    {(!isUserLoading && localId) && (
                        <Link className={s.loginWrapper}
                            to="/user"
                        >
                            <UserSVG />
                        </Link>
                    )}
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