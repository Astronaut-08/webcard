import { useEffect, useState } from 'react';
import styles from './LangToggle.module.css';
import { useTranslation } from 'react-i18next';

export default function LangToggle() {
    const [activeLang, setActiveLang] = useState('uk');
    const {t, i18n} = useTranslation()

    const changeLang = (lang) => {
        i18n.changeLanguage(lang)
        setActiveLang(lang)
    }

    useEffect(() => {
        changeLang(activeLang)
    }, [])

    return (
        <div className={styles.container}>
            <button 
                className={`${styles.button} ${activeLang === 'uk' ? styles.active : ''}`}
                onClick={() => changeLang('uk')}
            >
                УКР
            </button>
            <button 
                className={`${styles.button} ${activeLang === 'en' ? styles.active : ''}`}
                onClick={() => changeLang('en')}
            >
                EN
            </button>
        </div>
    );
}