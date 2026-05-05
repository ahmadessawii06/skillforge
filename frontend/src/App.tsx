import { Routes, Route, useLocation } from "react-router-dom";
import Interview from "./pages/interview/Interview";
import Home from "./pages/home/Home";
import Anlysis from "./pages/anlysis/Anlysis";
import CV from "./pages/cv/CV";
import Login from "./pages/login/Login";
import Plans from "./pages/plans/Plans";
import PinkTeam from "./pages/pinkteam/PinkTeam";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";


function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/home" element={<Home />} />
        <Route path="/anlysis" element={<Anlysis />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/pinkteam" element={<PinkTeam />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
