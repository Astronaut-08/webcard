import style from './Expertise.module.css'
import CoreExpertise from './CoreExpertise.jsx'
import ProfileAssistant from './ProfileAssistant.jsx'
import ScrollTrigger from './ScrollTrigger.jsx'

const Expertise = () => {
    return(
        <div className={style.main}>
            <ScrollTrigger type='typing'>
                <p className={style.toplabel}>01 / SYSTEMS INTELLIGENCE</p>
            </ScrollTrigger>
            
            <ScrollTrigger>
                <h2 className={style.capabilities}>From data architecture to deployed intelligence.</h2>
            </ScrollTrigger>
            
            <CoreExpertise />
            <ProfileAssistant />
        </div>
    )
}

export default Expertise
