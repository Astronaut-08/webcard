import style from './Profile.module.css'
import Availability from './Availability.jsx'
import Image from './Image.jsx';
import Link from './Link.jsx';
import TyperWriter from './TyperWriter.jsx';

const Profile = () => {
    return(
        <div className={style.main}>  
            <Availability />
            <Image />
            <h1 className={style.name}>
                <TyperWriter
                text='Volodymyr Yusyp' /></h1>
            <h3 className={style.undername}>
                <TyperWriter 
                text='AI / ML & database specialist' /></h3>
            <p className={style.description}>
                <TyperWriter
                text='I design data systems and machine-learning workflows that turn complex information into reliable decisions.' />
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
                href='www.linkedin.com/in/volodymyryusyp' />
                <Link 
                image='/icons.svg#github'
                href='https://github.com/Astronaut-08' />
            </div>
            
        </div>
    )
};

export default Profile;
