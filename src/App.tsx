
import Header from './components/common/Header'
import { Routes, Route } from 'react-router-dom'
import Ai from './pages/Ai'
import Home from './pages/Home'
import Anlysis from './pages/Anlysis'
import CV from './pages/CV'
import Login from './pages/Login'
import Plans from './pages/Plans'
import PinkTeam from './pages/PinkTeam'



function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/home" element={<Home />} />
        <Route path="/anlysis" element={<Anlysis />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/pinkteam" element={<PinkTeam />} />
      </Routes>

    </>
  )
}

export default App
