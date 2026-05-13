import { Routes, Route, useLocation } from "react-router-dom";
import Interview from "./pages/interview/Interview";
import Home from "./pages/home/Home";
import Analysis from "./pages/analysis/Analysis";
import CV from "./pages/cv/CV";
import Login from "./pages/login/Login";
import Plans from "./pages/plans/Plans";
import Team from "./pages/team/Team";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        {/* صفحة عامة */}
        <Route path="/" element={<Login />} />

        {/* صفحات محمية */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/interview" element={<ProtectedRoute><Interview /></ProtectedRoute>} />
        <Route path="/analysis" element={<ProtectedRoute><Analysis /></ProtectedRoute>} />
        <Route path="/cv" element={<ProtectedRoute><CV /></ProtectedRoute>} />
        <Route path="/plans" element={<ProtectedRoute><Plans /></ProtectedRoute>} />
        <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute> }/>
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;