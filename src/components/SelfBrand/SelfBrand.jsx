import styles from './SelfBrand.module.css'
import TyperWriter from '../TyperWriter'
import { useTranslation } from 'react-i18next'

export default function SelfBrand() {
    const { t } = useTranslation()

    return (
        <div className={styles.main}>
            <div className={styles.monogram}>
                <span className={styles['monogram-text']}>
                    <TyperWriter text={t('pib')} />
                </span>
            </div>
            <div className={styles.text}>
                <TyperWriter text={t('name')} />
            </div>
        </div>
    )
}