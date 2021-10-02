import { useState } from "react";

import Input from "../input";

import s from './style.module.css'

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState('false');

    const OnSubmitForm = (evt) => {
        evt.preventDefault();
        onSubmit && onSubmit({
            email,
            password,
            auth
        })
        setEmail('');
        setPassword('');
    }
    const onClickRegister = (evt) => {
        evt.preventDefault();
        setAuth(!auth);
    }
    return (
        <form onSubmit={OnSubmitForm}>
            <Input type="email" name="email" label="Enter emai" value={email}
                onChange={(evt) => setEmail(evt.target.value)}
            />
            <Input type="password" name="password" label="Enter Password" value={password}
                onChange={(evt) => setPassword(evt.target.value)}
            />
            <button>
                {
                    auth ? "Login" : "Register"
                }
            </button>
            <p className={s.auth}>
                {
                    auth ? "New player? " : "Registered?"
                }
                <button onClick={onClickRegister}>
                    {
                        auth ? "Register" : "Sign in"
                    }
                </button>
            </p>
        </form>
    );
};

export default LoginForm;