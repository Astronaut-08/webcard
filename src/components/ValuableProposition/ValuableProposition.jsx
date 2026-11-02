import styles from './ValuableProposition.module.css'
import { useTranslation } from 'react-i18next'
import TyperWriter from '../TyperWriter'

export default function ValuableProposition() {
    const { t } = useTranslation()

    return (
        <div className={styles.main}>
            <div className={styles.mark}>
                <span className={styles['mark-point']}>/</span>
                <span className={styles['mark-text']}><TyperWriter text='AI / ML & DATA SYSTEMS ENGINEER' /></span>
            </div>

            <h1 className={styles.title}><TyperWriter text={t('mainTitle')}/></h1>
            <p className={styles.description}><TyperWriter text={t('descriptionOfMainTitle')}/></p>

            <a className={styles.btn} href='mailto:volodymyr.yusyp@gmail.com'>
                <span>{t('mainConnectButton')}</span>
                <svg className={styles.arrow} viewBox="0 0 24 24">
                    <use href='/icons.svg#goto-black' />
                </svg>
            </a>

            <div className={styles.available}>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#4B85FF"/>
                </svg>
                <p className={styles['available-text']}>{t('mainChatAvailability')}</p>
            </div>
        </div>
    )
}