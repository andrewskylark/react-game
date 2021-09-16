import './style.module.css';
import {useHistory} from 'react-router-dom';

const Btn = ({text, route}) => {
    const history = useHistory();
    
    const onClick = () => {
        history.push(`/${route}`)
    }
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

export default Btn;