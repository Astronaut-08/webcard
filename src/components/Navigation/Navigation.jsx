import styles from './Navigation.module.css'
import TyperWriter from '../TyperWriter'
import { useTranslation } from 'react-i18next'
import Contacts from '../Contacts/Contacts'
import NavigationBtn from '../NavigationBtn/NavigationBtn'
import LangToggle from '../LangToggle/LangToggle'

export default function Navigation() {
    const { t } = useTranslation()

    return (
        <div className={styles.main}>
            <div className={styles['desktop-only']}>
                <p className={styles.navpoint}><TyperWriter text={t('headerAIChat')} /></p>
                <Contacts />
                <div className={styles.contact}>
                    <NavigationBtn iconName='/icons.svg#github' text='GitHub' link='https://github.com/Astronaut-08' />
                    <NavigationBtn iconName='/icons.svg#linked-in' text='LinkedIn' link='https://www.linkedin.com/in/volodymyryusyp/' />
                </div>
            </div>
            <LangToggle />
        </div>
    )
}