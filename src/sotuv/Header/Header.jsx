// components/Header.jsx
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";
import TailorLogo from "../../images/TailorLogo.png";
import Katalog from "../../images/Katalog.png";
import Search from "../../images/Search.png";
import Live from "../../images/Live.png";
import User from "../../images/user.png";
import Savat from "../../images/Savat.png";
import CatalogModal from '../CatalogModal/CatalogModal';
import CartModal from '../CartModal/CartModal';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  return (
    <header className="tailor-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
         <Link to="/"> <img 
            src={TailorLogo} 
            alt="Tailor Shop Namangan" 
            className="logo-image"
          />
          </Link>
        </div>
        
        {/* Catalog Button */}
        <button 
          className="catalog-button"
          onClick={() => setShowCatalogModal(true)}
        >
          <img src={Katalog} alt="Catalog" className="catalog-icon" />
          <span>Katalog</span>
        </button>
        
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Reyting baland tovar nomi"
            className="search-input"
          />
          <button className="search-button">
            <img src={Search} alt="Search" className="search-icon" />
          </button>
        </div>
        
        {/* Icons */}
        <div className="icon-group">
          <img src={Live} alt="Wishlist" className="header-icon" />
          <img src={User} alt="Account" className="header-icon" />
          <img 
            src={Savat} 
            alt="Cart" 
            className="header-icon"
            onClick={() => setShowCartModal(true)}
          />
        </div>
      </div>

      {/* Modals */}
      <CatalogModal 
        show={showCatalogModal} 
        onHide={() => setShowCatalogModal(false)} 
      />
      <CartModal 
        show={showCartModal} 
        onHide={() => setShowCartModal(false)} 
      />
    </header>
  );
};

export default Header;