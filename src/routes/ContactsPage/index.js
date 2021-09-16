import s from './style.module.css';
import Btn from '../../components/btn'

const ContactsPage = () => {
    return (
        <div className={s.page}>
            CONTACT PAGE
            <Btn 
                text="Back to Home Page"
                route=""
            />
        </div>
    );
};

export default ContactsPage;