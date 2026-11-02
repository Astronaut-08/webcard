import LangToggle from '../../components/LangToggle/LangToggle'
import PhotoCard from '../../components/PhotoCard/PhotoCard'
import SelfBrand from '../../components/SelfBrand/SelfBrand'
import NavigationBtn from '../../components/NavigationBtn/NavigationBtn'
import styles from './MobileApp.module.css'
import ValuableProposition from '../../components/ValuableProposition/ValuableProposition'
import AIChat from '../../components/AIChat/AIChat'
import TyperWriter from '../../components/TyperWriter'
import { useTranslation } from 'react-i18next'

export default function MobileApp() {
    const { t } = useTranslation()

    return (
        <div className={styles.main}>
            {/* Верхня панель */}
            <div className={styles.header}>
                <SelfBrand />
                <LangToggle />
            </div>
            
            {/* Основний контент відповідно до мобільного макета */}
            <PhotoCard />
            
            <div className={styles.contact}>
                <NavigationBtn iconName='/icons.svg#github' text='GitHub' link='https://github.com/Astronaut-08' />
                <NavigationBtn iconName='/icons.svg#linked-in' text='LinkedIn' link='https://www.linkedin.com/in/volodymyryusyp/' />
            </div>

            <ValuableProposition />
            <AIChat />
            <div className={styles.author}>
                <p className={styles.name}><TyperWriter text={t('name')} /></p>
                <p className={styles.specialization}><TyperWriter text='AI / ML & DATA SYSTEMS ENGINEER' /></p>
            </div>
        </div>
    )
}