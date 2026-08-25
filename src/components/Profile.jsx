import style from './Profile.module.css'
import Availability from './Availability.jsx'
import Image from './Image.jsx';
import Link from './Link.jsx';
import TyperWriter from './TyperWriter.jsx';
import Lang from './Lang.jsx'
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { t } = useTranslation()

    return(
        <div className={style.main}>
            <div className={style.langwrapper}>
                <Availability />
                <Lang />
            </div>
            
            <Image />
            <h1 className={style.name}>
                <TyperWriter
                text={t('name')} /></h1>
            <h3 className={style.undername}>
                <TyperWriter 
                text={t('specialisation')} /></h3>
            <p className={style.description}>
                <TyperWriter
                text={t('descriptionOfSpecialisation')} />
            </p>

            <div className={style.socialmedia}>
                <Link 
                image='/icons.svg#mail'
                href='mailto:volodymyr.yusyp@gmail.com' />
                <Link 
                image='/icons.svg#instagram'
                href='https://www.instagram.com/volodymyr_yusyp/' />
                <Link 
                image='/icons.svg#linked-in'
                href='https://www.linkedin.com/in/volodymyryusyp/' />
                <Link 
                image='/icons.svg#github'
                href='https://github.com/Astronaut-08' />
            </div>
            
        </div>
    )
};

export default Profile;
