import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <section>
            <h1>SkillForge - Project</h1>
            <button className='btn btn-primary'>This is bootstrap button test btn btn-primary</button>
          </section>
        } />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App