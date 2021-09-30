import s from './style.module.css'

const Input = ({ type="text", name, value, label, onChange }) => {

    return (
        <div className={s.root}>
            <input className={s.input} type={type} name={name} value={value} required onChange={onChange}/>
            <span className={s.highlight}></span>
            <span className={s.bar}></span>
            <label className={s.label}>{label}</label>
        </div>
    );
};

export default Input;