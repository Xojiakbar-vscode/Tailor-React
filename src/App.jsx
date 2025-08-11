import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";

// Sahifalar
import Home from "./components/Home/Home";
import SotuvHome from "./sotuv/Home/SotuvHome";
import BatafsilCard from "./components/Batafsil/BatafsilCard";

// Kontekst provider
import { ProductProvider } from "./Context/FavoritesContext";

// Stil va animatsiya
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    // AOS kutubxonasini ishga tushirish
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    // Kontekst provider butun ilovani qamrab oladi
    <ProductProvider>
      <Router>
        {/* Sahifa o'zgarganda yuqoriga scroll qilish */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/yana" element={<SotuvHome />} />
          <Route path="/batafsil/:id" element={<BatafsilCard />} />

          {/* Noma'lum yo'l uchun 404 sahifa */}
          <Route
            path="*"
            element={
              <h1 style={{ textAlign: "center", marginTop: 50 }}>
                404 — Sahifa topilmadi
              </h1>
            }
          />
        </Routes>
      </Router>
    </ProductProvider>
  );
};

export default App;
