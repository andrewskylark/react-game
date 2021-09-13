import './style.module.css';

const Btn = ({text, onClick}) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

export default Btn;