import styles from './PhotoCard.module.css'
import volodymyrPhoto from '../../assets/volodymyr.png'
import TyperWriter from '../TyperWriter'
import { useTranslation } from 'react-i18next'

export default function PhotoCard() {
    const {t} = useTranslation()

    return (
        <div className={styles.main}>
            <img 
            className={styles.image}
            src={volodymyrPhoto}
            alt='Photo of Volodymyr'
            loading='lazy'/>

            <div className={styles.description}>
                <p className={styles.name}><TyperWriter text={t('name')} /></p>
                <p className={styles.field}><TyperWriter text='UA · AI / ML · DATA SYSTEMS' /></p>
            </div>
        </div>
    )
}