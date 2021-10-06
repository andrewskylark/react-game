import { useEffect } from "react";
import { useState } from "react";

import Input from "../input";

import s from './style.module.css'

const LoginForm = ({ onSubmit, isResetField = false }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, [isResetField]);

    const OnSubmitForm = (evt) => {
        evt.preventDefault();
        onSubmit && onSubmit({
            email,
            password,
            register
        })
        setEmail('');
        setPassword('');
    }
    const onClickRegister = (evt) => {
        evt.preventDefault();
        setRegister(!register);
    }
    return (
        <form onSubmit={OnSubmitForm}>
            <Input type="email" name="email" label="Enter Email" value={email}
                onChange={(evt) => setEmail(evt.target.value)}
            />
            <Input type="password" name="password" label="Enter Password" value={password}
                onChange={(evt) => setPassword(evt.target.value)}
            />
            <button>
                {
                    register ? "Register" : "Login" 
                }
            </button>
            <p className={s.register}>
                {
                    register ? "Welcome back! " : "New player? "
                }
                <button onClick={onClickRegister}>
                    {
                        register ? "Sign in" : "Register" 
                    }
                </button>
            </p>
        </form>
    );
};

export default LoginForm;