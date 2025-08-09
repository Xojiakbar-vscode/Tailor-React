// App.jsx
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "../ScrollToTop"; // sahifa o‘zgarganda yuqoriga qaytarish
import Home from "./components/Home/Home"; // Asosiy sahifa
import SotuvHome from "./sotuv/Home/SotuvHome"; // Sotuv sahifasi
import BatafsilCard from "./components/Batafsil/BatafsilCard"; // Mahsulot batafsil
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animatsiya davomiyligi
      once: false,    // sahifani scroll qilganda har safar animatsiya bo‘lishi
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Asosiy sahifa */}
        <Route path="/" element={<Home />} />

        {/* Sotuv sahifasi */}
        <Route path="/yana" element={<SotuvHome />} />

        {/* Mahsulot batafsil sahifa */}
        <Route path="/batafsil/:id" element={<BatafsilCard />} />

        {/* 404 sahifa topilmasa */}
        <Route path="*" element={<h1>404 — Sahifa topilmadi</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
