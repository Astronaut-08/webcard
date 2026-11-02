import styles from './MainInfo.module.css'
import ValuableProposition from '../ValuableProposition/ValuableProposition'
import PhotoCard from '../PhotoCard/PhotoCard'

export default function MainInfo() {
    return (
        <div className={styles.main}>
            <ValuableProposition />
            <PhotoCard />
        </div>
    )
}