import styles from './Contacts.module.css'
import TyperWriter from '../TyperWriter.jsx'
import { useTranslation } from 'react-i18next'

export default function Contacts() {
    const { t } = useTranslation()

    return (
        <a className={styles.main} href='mailto: volodymyr.yusyp@gmail.com'>
            <TyperWriter text={t('headerConnect')} />
            <svg className={styles.arrow}><use href='/icons.svg#goto-blue' /></svg>
        </a>
    )
}