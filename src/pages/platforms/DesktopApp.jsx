import styles from './DesktopApp.module.css'
import Meet from '../../components/Meet/Meet'
import MainInfo from '../../components/MainInfo/MainInfo'
import AIChat from '../../components/AIChat/AIChat'
import Footer from '../../components/Footer/Footer'
import MobileActions from '../../components/MobileActions/MobileActions'

export default function DesctopApp() {
    return (
        <div className={styles.main}>
            <Meet />
            <MainInfo />
            <MobileActions />
            <AIChat />
            <Footer />
        </div>
    )
}