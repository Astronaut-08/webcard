import style from './App.module.css'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import Meet from '../components/Meet/Meet'
import MainInfo from '../components/MainInfo/MainInfo'
import AIChat from '../components/AIChat/AIChat'
import Footer from '../components/Footer/Footer'
import MobileActions from '../components/MobileActions/MobileActions'

export default function App() {

  return (
      <section className={style.mainsection}>
        <Meet />
        <MainInfo />
        <MobileActions />
        <AIChat />
        <Footer />
        <SpeedInsights />
        <Analytics />
      </section>
  )
}