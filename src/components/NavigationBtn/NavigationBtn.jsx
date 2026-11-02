import styles from './NavigationBtn.module.css'
import TyperWriter from '../TyperWriter.jsx'

export default function NavigationBtn({iconName, text, link=''}) {
    return (
        <a className={styles.btn} href={link}>
            <svg className={styles.icon}><use href={iconName} /></svg>
            <TyperWriter text={text} />
        </a>
    )
}
