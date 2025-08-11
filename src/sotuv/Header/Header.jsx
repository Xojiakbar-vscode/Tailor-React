import React, { useContext, useState } from "react";
import { ProductContext } from "../../Context/FavoritesContext";
import { Spinner } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css"

import CatalogModal from "../CatalogModal/CatalogModal";
import CartModal from "../CartModal/CartModal";
import UserSidebar from "../../components/HomeNav/UserSidebar/UserSidebar";
import CardHeartModal from "../CardHeartModal/CardHeartModal";

import TailorLogo from "../../images/TailorLogo.png";
import Katalog from "../../images/Katalog.png";
import Search from "../../images/Search.png";
import User from "../../images/user.png";
import Savat from "../../images/Savat.png";
import useAuth from '../../../hooks/useAuth';


const Header = () => {
  // Context dan kerakli state va funksiyalarni olish
  const { products, loading, userId, toggleFavorite } = useContext(ProductContext);
const { user,  login, logout, register, updateProfile } = useAuth();
  // Local state modal ochish-yozish uchun
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showUserSidebar, setShowUserSidebar] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  // Sevimli mahsulotlar filtrlash
  const favoriteProducts = products.filter((p) => p.is_favorite);

  // Yurak (sevimli) ikonasi bosilganda ishlaydi
  const handleFavoriteClick = () => {
    if (!userId) {
      alert("Iltimos, tizimga kiring.");
      setShowUserSidebar(true);
      return;
    }
    setShowFavoritesModal(true);
  };

  return (
    <header className="tailor-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/">
            <img src={TailorLogo} alt="Tailor Shop Namangan" className="logo-image" />
          </Link>
        </div>

        {/* Catalog tugmasi */}
        <button className="catalog-button" onClick={() => setShowCatalogModal(true)}>
          <img src={Katalog} alt="Catalog" className="catalog-icon" />
          <span>Katalog</span>
        </button>

        {/* Qidiruv */}
        <div className="search-container">
          <input type="text" placeholder="Reyting baland tovar nomi" className="search-input" />
          <button className="search-button">
            <img src={Search} alt="Search" className="search-icon" />
          </button>
        </div>

        {/* Iconlar guruhi */}
        <div className="icon-group">
          {/* Sevimlilar ikonasi */}
          <div
            className="favorites-icon-container"
            onClick={handleFavoriteClick}
            style={{ cursor: "pointer" }}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <FaHeart
                className="header-icon heart-icon"
                color={favoriteProducts.length > 0 ? "red" : "gray"}
              />
            )}
            {favoriteProducts.length > 0 && (
              <span className="favorites-count">{favoriteProducts.length}</span>
            )}
          </div>

          {/* Foydalanuvchi ikonasi */}
          <img
            src={User}
            alt="Account"
            className="header-icon"
            onClick={() => setShowUserSidebar(true)}
            style={{ cursor: "pointer" }}
          />

          {/* Savat ikonasi */}
          <img
            src={Savat}
            alt="Cart"
            className="header-icon"
            onClick={() => setShowCartModal(true)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      {/* Modal oynalar */}
      <CatalogModal show={showCatalogModal} onHide={() => setShowCatalogModal(false)} />
      <CartModal show={showCartModal} onHide={() => setShowCartModal(false)} />

      <CardHeartModal
        show={showFavoritesModal}
        onHide={() => setShowFavoritesModal(false)}
        favorites={favoriteProducts}
        onToggleFavorite={toggleFavorite}
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
    </header>
  );
};

export default Header;
