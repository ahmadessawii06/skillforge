
import Header from './components/common/header/Header'
import { Footer } from './components/common/footer/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import Ai from './pages/ai/Ai'
import Home from './pages/home/Home'
import Anlysis from './pages/anlysis/Anlysis'
import CV from './pages/cv/CV'
import Login from './pages/login/Login'
import Plans from './pages/plans/Plans'
import PinkTeam from './pages/pinkteam/PinkTeam'


function App() {

  const location = useLocation();

  const hideLayout = location.pathname === "/";

  return (
    <>
    
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/home" element={<Home />} />
        <Route path="/anlysis" element={<Anlysis />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/pinkteam" element={<PinkTeam />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  )
}

export default App