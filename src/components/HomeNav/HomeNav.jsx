import React, { useState, useEffect, useRef } from "react";
import "./HomeNav.css";
import logoImg from "../../assets/1.svg";
import heroImg from "../../assets/img.png";
import { HiOutlineUserCircle, HiBars3 } from "react-icons/hi2";

const HomeNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
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

  // Close menu on escape key press
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
        {/* Menu Button and Navigation */}
        <div className="menu-area" ref={menuRef}>
          <button 
            className={`menu-btn ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Menyuni ochish"
            aria-controls="main-menu"
          >
            <HiBars3 className="menu-icon" />
            <span>Menu</span>
          </button>

          <nav 
            className={`navbar ${isOpen ? "open" : ""}`}
            id="main-menu"
            aria-hidden={!isOpen}
          >
            <a href="#" onClick={() => setIsOpen(false)}>Buyurtmalarni ko'rish</a>
            <a href="#" onClick={() => setIsOpen(false)}>Mahsulotlar</a>
          </nav>
        </div>

        {/* Logo */}
        <div className="logo">
          <img src={logoImg} alt="Tailor Shop Logo" className="block" />
        </div>

        {/* User Icon */}
        <div className="right-icons">
          <HiOutlineUserCircle className="user-icon" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="aboutSection3">
        <img src={heroImg} alt="Tikuvchilik mahsulotlari" className="none" />
        <div className="hero-content">
          <h2>Tikuvchilik uchun hammasi bir joyda!</h2>
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