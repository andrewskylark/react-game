import s from './style.module.css';
import Btn from '../../components/btn'

const GamePage = ({ onChangePage }) => {
    const onClick = () => {
        onClickBtn && onClickBtn('app');
    }
    const onClickBtn = (page) => {
        onChangePage && onChangePage(page);
    }
    return (
        <div className={s.page}>
            404 NOT FOUND
            <Btn 
                text="Home Page"
                onClick={onClick}
            />
        </div>
    );
};

export default GamePage;