import style from './Availability.module.css'
import TyperWriter from './TyperWriter.jsx';

const Availability = () => {
    return(
        <div className={style.availible}>
            <div className={style.dot}></div>
            <p className={style.status}>
                <TyperWriter
                text='AVAILABLE FOR SELECT COLLABORATIONS' /></p>
        </div>
    )
};

export default Availability;
