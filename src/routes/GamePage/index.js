import s from './style.module.css';
import Btn from '../../components/btn';
// import {useHistory} from 'react-router-dom';

const GamePage = () => {
    // const history = useHistory();
    // const onClick = () => {
    //     // onClickBtn && onClickBtn('app');
    //     history.push('/')
    // }
    // const onClickBtn = (page) => {
    //     onChangePage && onChangePage(page);
    // }
    return (
        <div className={s.page}>
            GAMEPAGE
            <Btn 
                text="Back to Home Page"
                route=""
            />
        </div>
    );
};

export default GamePage;