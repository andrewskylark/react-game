import Menu from '../menu'
import NavBar from '../navBar'
import { useState } from "react";

const MenuHeader = ({ bgActive }) => {
    const [isOpened, setOpened] = useState(false);
    const onClickMenu = () => {
        setOpened(!isOpened);
    }
    const onClickLink = () => {
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
                onClickLink={onClickLink}
                isOpened={isOpened}
            />
        </>
    )
}

export default MenuHeader;
