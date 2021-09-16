import s from './style.module.css';
import Btn from '../../components/btn'

const GamePage = () => {
    return (
        <div className={s.page}>
            404 NOT FOUND
            <Btn 
                text="Back to Home Page"
                route=""
            />
        </div>
    );
};

export default GamePage;