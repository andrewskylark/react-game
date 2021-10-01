import { useState } from "react";
import {NotificationManager} from 'react-notifications';


import Menu from '../menu'
import NavBar from '../navBar'
import Modal from '../modal';
import LoginForm from '../loginForm';

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
    const onSubmitLoginForm = async ({email, password}) => {
        // console.log(values)
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            })
        }
        const responce = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5F8VIr6hcBgKoQAN6yWJ-c145EiJmZdA', requestOptions).then(res => res.json());
        console.log(responce)
        if (responce.hasOwnProperty('error')) {
            NotificationManager.error(responce.error.message, 'Error!');
        } else {
            NotificationManager.success('Success!');
        }
        
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
                <LoginForm
                    onSubmit={onSubmitLoginForm}
                />
            </Modal>
        </>
    )
}

export default MenuHeader;
