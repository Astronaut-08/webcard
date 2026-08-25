import style from './App.module.css'
import Profile from '../components/Profile.jsx'
import Expertise from '../components/Expertise.jsx'
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {

  return (
      <section className={style.mainsection}>
        <Profile />
        <Expertise />
        <SpeedInsights />
      </section>
  )
}

export default App
