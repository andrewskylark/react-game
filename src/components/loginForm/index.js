import cn from "classnames";
import { useState } from "react";
import Input from "../input";

import s from './style.module.css'

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const onChangeEmail = (evt) => {
    //     // setPassword(evt.tagret.value)
    //     console.log(evt.target.value);
    //     setEmail(evt.target.value);
    //     console.log(email)
    // }
    // const onChangePassword = (evt) => {
    //     // setPassword(evt.tagret.value)
    //     console.log(evt.target.value);
    //     setPassword(evt.target.value);
    //     console.log(password)
    // }
    const OnSubmitForm = (evt) => {
        evt.preventDefault()
        onSubmit && onSubmit({
            email,
            password
        })
        setEmail('');
        setPassword('');
    }
    return (
        <form onSubmit={OnSubmitForm}>
            <Input type="email" name="email" label="Enter emai" value={email}
                onChange={(evt) => setEmail(evt.target.value)}
            />
            {/* <input type="email" name="email" label="Enter email"
                onChange={onChangeEmail}
            /> */}
            <Input type="password" name="password" label="Enter Password" value={password}
                onChange={(evt) => setPassword(evt.target.value)}
            />
            <button>
                Login / Register
            </button>
        </form>
    );
};

export default LoginForm;