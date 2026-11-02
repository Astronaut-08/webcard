import styles from './Footer.module.css'
import TyperWriter from '../TyperWriter'
import { useTranslation } from 'react-i18next'

export default function Footer() {
    const { t } = useTranslation()

    const scrollToTop = (evt) => {
        evt.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className={styles.main}>
            <div className={styles.author}>
                <p className={styles.name}><TyperWriter text={t('name')} /></p>
                <p className={styles.specialization}><TyperWriter text='AI / ML & DATA SYSTEMS ENGINEER' /></p>
            </div>

            <p className={styles.position}><TyperWriter text={t('footerTitle')} /></p>

            <div className={styles.up}>
                <a href="#" onClick={scrollToTop} className={styles.upbtn}>
                    <span><TyperWriter text={t('footerUpBtn')} /></span>
                    <svg className={styles.icon} viewBox="0 0 24 24">
                        <use href='/icons.svg#go-up' />
                    </svg>
                </a>
            </div>
        </footer>
    )
}