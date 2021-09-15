// import s from './style.module.css';
import Menu from '../menu'
import NavBar from '../navBar'
import { useState } from "react";

const MenuHeader = ({ bgActive }) => {
    const [isOpened, setOpened] = useState(false);
    const onClickMenu = () => {
        setOpened(!isOpened);
    }
    return (
        <>
            <NavBar
                onClickMenu={onClickMenu}
                isOpened={isOpened}
                bgActive={bgActive}
            />
            <Menu
                isOpened={isOpened}
            />
        </>
    )
}

export default MenuHeader;
