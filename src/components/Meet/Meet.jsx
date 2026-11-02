import styles from './Meet.module.css'
import SelfBrand from '../SelfBrand/SelfBrand.jsx'
import Navigation from '../Navigation/Navigation'

export default function Meet() {
    return (
        <div className={styles.main}>
            <SelfBrand />
            <Navigation />
        </div>
    )
}