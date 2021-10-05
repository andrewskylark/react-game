import { useState } from "react";
import {NotificationManager} from 'react-notifications';

import Menu from '../menu'
import NavBar from '../navBar'
import Modal from '../modal';
import LoginForm from '../loginForm';
import { useDispatch } from "react-redux";
import { getUserUpdateAsync } from "../../store/user";
// import { selectUserLoading, selectUserLocalID } from "../../store/user";

const MenuHeader = ({ bgActive }) => {
    const dispatch = useDispatch();
    // const isUserLoading = useSelector(selectUserLoading);
    // const localId = useSelector(selectUserLocalID)
    // console.log(isUserLoading)
    // console.log(localId)
    const [isOpened, setOpened] = useState(false);
    const [isOpenedModal, setOpenedModal] = useState(false);
    const SIGN_UP_POST = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5F8VIr6hcBgKoQAN6yWJ-c145EiJmZdA';
    const SIGN_IN_POST = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5F8VIr6hcBgKoQAN6yWJ-c145EiJmZdA';
    
    const onClickMenu = () => {
        setOpened(!isOpened);
    }
    const onClickLink = () => {
        setOpened(!isOpened);
    }
    const onClickLogin = () => {
        setOpenedModal(prevState => !prevState);
    }
    const onSubmitLoginForm = async ({email, password, register}) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            })
        }
        const responce = await fetch(
            register ? SIGN_UP_POST : SIGN_IN_POST, requestOptions)
            .then((res) => res.json()
        );
 
        if (responce.hasOwnProperty('error')) {
            NotificationManager.error(responce.error.message, 'Error!');
            // alert('error')
        } else {
            // alert('success')
            if (register === false) {
                localStorage.setItem('idToken', responce.idToken);
                const pokemonsStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then((res) => res.json());
                for (const item of pokemonsStart.data) {
                    await fetch(`https://react-game-1c6e1-default-rtdb.firebaseio.com/${responce.localId}/pokemons.json?auth=${responce.idToken}`, {
                        method: 'POST',
                        body: JSON.stringify(item),
                    });//creates unique user upon signing in, sends 5 cards to firebase
                }
                dispatch(getUserUpdateAsync());//sets user to redux
                onClickLogin();
            }
            // if (register === true) {
            //     const pokemonsStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then((res) => res.json());
            //     console.log(pokemonsStart)
            // }
            NotificationManager.success(
                register ? 'Registered succesfully!' : 'Signed in, welcome back!'
            );
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
                title="Log in, or register"
                onCloseModal={onClickLogin}
            >
                <LoginForm
                    isResetField={!isOpenedModal}
                    onSubmit={onSubmitLoginForm}
                />
            </Modal>
        </>
    )
}

export default MenuHeader;
