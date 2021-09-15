// import s from './style.module.css';
import Menu from '../menu'
import NavBar from '../navBar'
import { useState } from "react";

const MenuHeader = () => {
    const [isActive, setActive] = useState(false);
    const onClickBtn = () => {
        setActive(!isActive);
    }
    return (
        <>
            <NavBar
                onClickBtn={onClickBtn}
                isActive={isActive}
            />
            <Menu
                isActive={isActive}
            />
        </>
    )
}

export default MenuHeader;
