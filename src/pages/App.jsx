import style from './App.module.css'
import Profile from '../components/Profile.jsx'
import Expertise from '../components/Expertise.jsx'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
      <section className={style.mainsection}>
        <Profile />
        <Expertise />
        <SpeedInsights />
        <Analytics />
      </section>
  )
}

export default App
