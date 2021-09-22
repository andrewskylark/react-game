import s from './style.module.css';
import Btn from '../../../../components/btn'

const FinishPage = () => {
    return (
        <div className={s.page}>
            CONTACTS PAGE
            <Btn 
                text="Back to Home Page"
                route=""
            />
        </div>
    );
};

export default FinishPage;