import AIChat from '../../components/AIChat/AIChat'
import Footer from '../../components/Footer/Footer'
import LangToggle from '../../components/LangToggle/LangToggle'
import NavigationBtn from '../../components/NavigationBtn/NavigationBtn'
import PhotoCard from '../../components/PhotoCard/PhotoCard'
import SelfBrand from '../../components/SelfBrand/SelfBrand'
import ValuableProposition from '../../components/ValuableProposition/ValuableProposition'
import TyperWriter from '../../components/TyperWriter'
import { useTranslation } from 'react-i18next'
import styles from './TabletApp.module.css'

export default function TabletApp() {
    const { t } = useTranslation()

    return (
        <div className={styles.main}>
            {/* Верхня панель */}
            <div className={styles.header}>
                <SelfBrand />
                <div className={styles.headerRight}>
                    <LangToggle />
                    <p className={styles.navpoint}><TyperWriter text={t('headerAIChat')} /></p>
                </div>
            </div>

            {/* Контент планшетної версії */}
            <div className={styles.contentGrid}>
                <PhotoCard />
                <div className={styles.rightColumn}>
                    <div className={styles.contact}>
                        <NavigationBtn iconName='/icons.svg#github' text='GitHub' link='https://github.com/Astronaut-08' />
                        <NavigationBtn iconName='/icons.svg#linked-in' text='LinkedIn' link='https://www.linkedin.com/in/volodymyryusyp/' />
                    </div>
                    <ValuableProposition />
                </div>
            </div>

            <AIChat />
            <Footer />
        </div>
    )
}