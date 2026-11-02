import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import DesktopApp from './platforms/DesktopApp'
import TabletApp from './platforms/TabletApp'
import MobileApp from './platforms/MobileApp'
import styles from './App.module.css'

export default function App() {
    return (
        <>
            <div className={styles.desktop}>
                <DesktopApp />
            </div>
            <div className={styles.tablet}>
                <TabletApp />
            </div>
            <div className={styles.mobile}>
                <MobileApp />
            </div>
            <SpeedInsights />
            <Analytics />
        </>
    )
}