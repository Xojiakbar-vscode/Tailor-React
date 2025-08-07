import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";
import TailorLogo from "../../images/TailorLogo.png";
import Katalog from "../../images/Katalog.png";
import Search from "../../images/Search.png";
import User from "../../images/user.png";
import Savat from "../../images/Savat.png";
import CatalogModal from '../CatalogModal/CatalogModal';
import CartModal from '../CartModal/CartModal';
import { Link } from 'react-router-dom';
import UserSidebar from '../../components/HomeNav/UserSidebar/UserSidebar';
import useAuth from '../../../hooks/useAuth';
import { FaHeart } from 'react-icons/fa';
import CardHeartModal from '../CardHeartModal/CardHeartModal';
import axios from 'axios';

const Header = () => {
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showUserSidebar, setShowUserSidebar] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [error, setError] = useState(null);

  const { user, loading: authLoading, login, register, logout, updateProfile } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchFavorites();
    } else {
      // Agar foydalanuvchi chiqib ketsa, sevimlilarni tozalash
      setFavoriteProducts([]);
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      setLoadingFavorites(true);
      setError(null);
      const response = await axios.get(
        `http://localhost/tailorshop/Backend/api/favorites.php?user_id=${user.id}`
      );
      
      if (response.data.success) {
        setFavoriteProducts(response.data.data || []);
      } else {
        throw new Error(response.data.message || 'Sevimlilarni yuklashda xatolik');
      }
    } catch (error) {
      console.error('Sevimlilarni yuklashda xatolik:', error);
      setError(error.message);
      setFavoriteProducts([]);
    } finally {
      setLoadingFavorites(false);
    }
  };

  const handleFavoriteClick = () => {
    if (!user) {
      setShowUserSidebar(true); // Agar foydalanuvchi tizimga kirmagan bo'lsa, login sahifasiga yo'naltirish
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
            <img 
              src={TailorLogo} 
              alt="Tailor Shop Namangan" 
              className="logo-image"
              onError={(e) => {
                e.target.src = '/placeholder-logo.png';
              }}
            />
          </Link>
        </div>
        
        {/* Catalog Button */}
        <button 
          className="catalog-button"
          onClick={() => setShowCatalogModal(true)}
          aria-label="Katalogni ochish"
        >
          <img 
            src={Katalog} 
            alt="Catalog" 
            className="catalog-icon"
            onError={(e) => {
              e.target.src = '/placeholder-icon.png';
            }}
          />
          <span>Katalog</span>
        </button>
        
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Reyting baland tovar nomi"
            className="search-input"
            aria-label="Qidiruv"
          />
          <button className="search-button" aria-label="Qidiruvni boshlash">
            <img 
              src={Search} 
              alt="Search" 
              className="search-icon"
              onError={(e) => {
                e.target.src = '/placeholder-icon.png';
              }}
            />
          </button>
        </div>

        {/* Icons Group */}
        <div className="icon-group">
          {/* Favorites Icon */}
          <div 
            className="favorites-icon-container"
            onClick={handleFavoriteClick}
            aria-label="Sevimlilar"
            title="Sevimli mahsulotlar"
          >
            <FaHeart className="header-icon heart-icon" />
            {favoriteProducts.length > 0 && (
              <span className="favorites-count">{favoriteProducts.length}</span>
            )}
            {loadingFavorites && <span className="loading-dot">...</span>}
          </div>
          
          {/* User Icon */}
          <img 
            src={User} 
            alt="Account" 
            className="header-icon"
            onClick={() => setShowUserSidebar(true)}
            style={{ cursor: 'pointer' }}
            onError={(e) => {
              e.target.src = '/placeholder-user.png';
            }}
            aria-label="Foydalanuvchi hisobi"
            title="Hisob"
          />
          
          {/* Cart Icon */}
          <img 
            src={Savat} 
            alt="Cart" 
            className="header-icon"
            onClick={() => setShowCartModal(true)}
            style={{ cursor: 'pointer' }}
            onError={(e) => {
              e.target.src = '/placeholder-cart.png';
            }}
            aria-label="Savat"
            title="Savat"
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
      
      <CardHeartModal
        show={showFavoritesModal}
        onHide={() => setShowFavoritesModal(false)}
        userId={user?.id}
        onUpdate={fetchFavorites}
      />
      
      {showUserSidebar && (
        <UserSidebar
          user={user}
          loading={authLoading}
          onLogin={login}
          onRegister={register}
          onLogout={logout}
          onUpdateProfile={updateProfile}
          onClose={() => setShowUserSidebar(false)}
        />
      )}
    </header>
  );
};

export default Header;