import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import s from './style.module.css';
import YouWin from './assets/you-win.png';
import YouLose from './assets/you-lose.png';
import Draw from './assets/draw.png';

const Result = ({ type, show }) => {
    const [url, setUrl] = useState(null);
    const history = useHistory();
    const onClick = () => history.push('/game/finish')

    useEffect(() => {
        switch (type) {
            case 'win':
                setUrl(YouWin);
                break;
            case 'lose':
                setUrl(YouLose);
                break;
            case 'draw':
                setUrl(Draw);
                break;
            default:
                setUrl(YouWin);
        }
    }, [type]);

    return (
        <div className={s.result}
            style={{ display: show === true ? "block" : "none" }}>
            <img src={url} alt="result" />
            <button onClick={onClick} >
                OK!
            </button>
        </div>
    );
};

export default Result;
