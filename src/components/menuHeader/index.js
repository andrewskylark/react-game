import Menu from '../menu'
import NavBar from '../navBar'
import { useState } from "react";
import Modal from '../modal';

const MenuHeader = ({ bgActive }) => {
    const [isOpened, setOpened] = useState(false);
    const [isOpenedModal, setOpenedModal] = useState(false);
    const onClickMenu = () => {
        setOpened(!isOpened);
    }
    const onClickLink = () => {
        setOpened(!isOpened);
    }
    const onClickLogin = () => {
        setOpenedModal(prevState => !prevState);
    }
    return (
        <>
            <NavBar
                isOpened={isOpened}
                bgActive={bgActive}
                onClickMenu={onClickMenu}
                onClickLogin={onClickLogin}
            />
            <Menu
                isOpened={isOpened}
                onClickLink={onClickLink}
            />
            <Modal
                isOpened={isOpenedModal}
                title="Log in or register"
                onCloseModal={onClickLogin}
            >
                text
            </Modal>
        </>
    )
}

export default MenuHeader;
