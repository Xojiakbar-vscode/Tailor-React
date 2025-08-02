import React, { useState, useEffect, useRef } from "react";
import "./HomeNav.css";
import logoImg from "../../assets/1.svg";
import heroImg from "../../assets/img.png";
import { HiOutlineUserCircle, HiBars3 } from "react-icons/hi2";


const HomeNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);



  // Tashqariga bosilganda yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  // Escape tugmasi bilan yopish
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="header">
      <header>
        {/* Chap tomonda menyu tugmasi */}
        <div className="menu-area" ref={menuRef}>
          <button
            className={`menu-btn ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <HiBars3 className="menu-icon" />
            <span>Menu</span>
          </button>

          <nav className={`navbar ${isOpen ? "open" : ""}`}>
            <a href="#" onClick={() => setIsOpen(false)}>Buyurtmalarni ko‘rish</a>
            <a href="#" onClick={() => setIsOpen(false)}>Mahsulotlar</a>
          </nav>
        </div>

        {/* O‘rtada logo */}
        <div className="logo">
          <img src={logoImg} alt="Tailor Shop Logo" />
        </div>

        {/* O‘ng tomonda user icon */}
        <div className="right-icons">
          <HiOutlineUserCircle className="user-icon" />
        </div>
      </header>

      {/* Hero bo‘lim */}
      <section className="hero">
        <img src={heroImg} alt="Tikuvchilik mahsulotlari" className="none" />
        <div className="hero-content">
          <h2 data-aos="fade-down">Tikuvchilik uchun hammasi bir joyda!</h2>
          <p className="fade-in">
            Eng sifatli mahsulotlar — Tailor Shop Namangan da.
          </p>
          <div className="hero-spacer"></div>
        </div>
      </section>
    </div>
  );
};

export default HomeNav;
