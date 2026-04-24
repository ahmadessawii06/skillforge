import { Routes, Route } from "react-router-dom";
import Ai from "./pages/ai/Ai";
import Home from "./pages/home/Home";
import Anlysis from "./pages/anlysis/Anlysis";
import CV from "./pages/cv/CV";
import Login from "./pages/login/Login";
import Plans from "./pages/plans/Plans";
import PinkTeam from "./pages/pinkteam/PinkTeam";
import Header from "./components/common/header/Header";


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
  );
}

export default App;
