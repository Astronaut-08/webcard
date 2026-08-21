import style from './Expertise.module.css'
import CoreExpertise from './CoreExpertise.jsx'
import ProfileAssistant from './ProfileAssistant.jsx'

const Expertise = () => {
    return(
        <div className={style.main}>
            <p className={style.toplabel}>01 / SYSTEMS INTELLIGENCE</p>
            <h2 className={style.capabilities}>From data architecture to deployed intelligence.</h2>
            <CoreExpertise />
            <ProfileAssistant />
        </div>
    )
}

export default Expertise
