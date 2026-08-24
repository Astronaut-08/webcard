import style from './Expertise.module.css'
import CoreExpertise from './CoreExpertise.jsx'
import ProfileAssistant from './ProfileAssistant.jsx'
import TyperWriter from './TyperWriter.jsx'
import { useTranslation } from 'react-i18next'

const Expertise = () => {
    const { t } = useTranslation()
    return(
        <div className={style.main}>
            <p className={style.toplabel}>
                <TyperWriter
                text={t('partOfSkills01')} />
            </p>

            <h2 className={style.capabilities}>
                <TyperWriter
                text={t('titleOfSkills')} />
            </h2>
            
            <CoreExpertise />
            <ProfileAssistant />
        </div>
    )
}

export default Expertise
