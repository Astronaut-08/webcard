import style from './Availability.module.css'
import TyperWriter from './TyperWriter.jsx';
import { useTranslation } from 'react-i18next';

const Availability = () => {
    const { t } = useTranslation()

    return(
        <div className={style.availible}>
            <div className={style.dot}></div>
            <p className={style.status}>
                <TyperWriter
                text={t('availible')} /></p>
        </div>
    )
};

export default Availability;
