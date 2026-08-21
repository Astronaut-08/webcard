import style from './Profile.module.css'
import Availability from './Availability.jsx'
import Image from './Image.jsx';
import Button from './Button.jsx';

const Profile = () => {
    return(
        <div className={style.main}>
            <Availability />
            <Image />
            <h1 className={style.name}>Volodymyr Yusyp</h1>
            <h3 className={style.undername}>AI / ML & database specialist</h3>
            <p className={style.description}>
                I design data systems and machine-learning workflows that turn complex information into reliable decisions.
            </p>
            <Button />
        </div>
    )
};

export default Profile;
