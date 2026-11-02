import styles from './AIChatTitle.module.css'
import { useTranslation } from 'react-i18next'
import TyperWriter from '../TyperWriter'

export default function AIChatTitle({ statusText }) {
    const { t } = useTranslation()

    return (
        <div className={styles.main}>
            <div className={styles.intro}>
                <svg className={styles['ai-icon']} viewBox="0 0 24 24">
                    <use href="/icons.svg#ai-icon" />
                </svg>

                <div className={styles.description}>
                    <p className={styles.title}><TyperWriter text={t('AIChatTitle')} /></p>
                    <p className={styles.argument}><TyperWriter text={t('AIChatDescription')} /></p>
                </div>
            </div>

            <div className={styles.status}>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#4B85FF"/>
                </svg>

                <p className={styles['status-text']}>
                    <TyperWriter text={statusText || t('AIChatAvailability1')} />
                </p>
            </div>
        </div>
    )
}