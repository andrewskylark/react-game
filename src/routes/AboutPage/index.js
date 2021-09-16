import s from './style.module.css';
import Btn from '../../components/btn'

const AboutPage = () => {
    return (
        <div className={s.page}>
            ABOUT PAGE
            <Btn 
                text="Back to Home Page"
                route=""
            />
        </div>
    );
};

export default AboutPage;