import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Navbar from "./Components/Navbar.jsx";

function App() {
  return (
    <div className="min-h-screen bg-pupkin_spice  text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute left-1/2 top-0  w-full h-full -translate-x-1/2
             bg-[radial-gradient(ellipse_at_top,rgba(255,180,120,0.35)_0%,rgba(239,200,26,0.15)_45%,rgba(0,0,0,0)_100%)]"
          ></div>
        </div>
      </div>
      <div className="relative z-50 pt-20 " >
<Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
