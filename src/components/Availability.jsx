import style from './Availability.module.css'

const Availability = () => {
    return(
        <div className={style.availible}>
            <div className={style.dot}></div>
            <p className={style.status}>AVAILABLE FOR SELECT COLLABORATIONS</p>
        </div>
    )
};

export default Availability;
