import style from './App.module.css'
import Profile from '../components/Profile.jsx'
import Expertise from '../components/Expertise.jsx'

function App() {

  return (
      <section className={style.mainsection}>
        <Profile />
        <Expertise />
      </section>
  )
}

export default App
