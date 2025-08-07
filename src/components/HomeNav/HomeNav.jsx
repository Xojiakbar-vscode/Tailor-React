// src/components/HomeNav/HomeNav.js
import React, { useState, useRef } from 'react';
import { HiOutlineUserCircle, HiBars3 } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/1.svg';
import heroImg from '../../assets/img.png';
import CartModal from '../../sotuv/CartModal/CartModal';
import UserSidebar from './UserSidebar/UserSidebar';
import useAuth from '../../../hooks/useAuth';
import './HomeNav.css';

const HomeNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showUserSidebar, setShowUserSidebar] = useState(false);
  const menuRef = useRef(null);
  
   const { user, loading, login, logout, register, updateProfile } = useAuth();

  // Tashqariga bosilganda yopish
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Escape tugmasi bilan yopish
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setShowUserSidebar(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="header">
      <header>
        <div className="menu-area" ref={menuRef}>
          <button
            className={`menu-btn ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <HiBars3 className="menu-icon" />
            <span>Menu</span>
          </button>

          <nav className={`navbar ${isOpen ? 'open' : ''}`}>
            <a href="#" onClick={() => setShowCartModal(true)}>Buyurtmalarni ko'rish</a>
            <Link to="/yana" className="yana">Mahsulotlar</Link>
          </nav>
        </div>

        <div className="logo">
          <img src={logoImg} alt="Tailor Shop Logo" />
        </div>

        <div className="right-icons">
          <HiOutlineUserCircle 
            className="user-icon" 
            onClick={() => setShowUserSidebar(true)}
          />
        </div>
      </header>

      <section className="hero">
        <img src={heroImg} alt="Tikuvchilik mahsulotlari" className="none" />
        <div className="hero-content">
          <h2 data-aos="fade-down">Tikuvchilik uchun hammasi bir joyda!</h2>
          <p className="fade-in">
            Eng sifatli mahsulotlar — Tailor Shop Namangan da.
          </p>
        </div>
        <div className="hero-spacer"></div>
      </section>

      <CartModal
        show={showCartModal}
        onHide={() => setShowCartModal(false)}
      />

      {showUserSidebar && (
       <UserSidebar
  user={user}
  loading={loading}
  onLogin={login}
  onRegister={register}
  onLogout={logout}
  onUpdateProfile={updateProfile} // Yangi prop qo'shildi
  onClose={() => setShowUserSidebar(false)}
/>
      )}
    </div>
  );
};

export default HomeNav;