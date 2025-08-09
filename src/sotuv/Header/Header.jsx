import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

import TailorLogo from "../../images/TailorLogo.png";
import Katalog from "../../images/Katalog.png";
import Search from "../../images/Search.png";
import User from "../../images/user.png";
import Savat from "../../images/Savat.png";

import CatalogModal from "../CatalogModal/CatalogModal";
import CartModal from "../CartModal/CartModal";
import UserSidebar from "../../components/HomeNav/UserSidebar/UserSidebar";
import CardHeartModal from "../CardHeartModal/CardHeartModal";

import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const Header = () => {
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showUserSidebar, setShowUserSidebar] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  // 🔹 Auth tekshirish
  const checkAuth = async () => {
    try {
      const res = await fetch(
        "http://localhost/tailorshop/Backend/api/check_auth.php",
        { credentials: "include" }
      );
      const data = await res.json();
      if (data.authenticated) {
        setUserId(data.user.id);
      } else {
        setUserId(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUserId(null);
    }
  };

  // 🔹 Mahsulotlarni olish
  const fetchProducts = async () => {
    try {
      setLoadingFavorites(true);
      const res = await fetch(
        "http://localhost/tailorshop/Backend/api/products.php",
        { credentials: "include" }
      );
      const data = await res.json();
      if (data.success) {
        setProducts(
          data.data.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.short_description,
            price: parseFloat(item.price),
            image: item.image_url || "/placeholder.png",
            is_favorite: Boolean(item.is_favorite),
          }))
        );
      }
    } catch (error) {
      console.error("Fetch products error:", error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  // 🔹 Like qo‘shish yoki olib tashlash
  const toggleFavorite = async (productId, currentFavorite) => {
    if (!userId) {
      toast.info("Sevimlilarga qo‘shish uchun tizimga kiring.");
      setShowUserSidebar(true);
      return;
    }

    // Optimistik update
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, is_favorite: !currentFavorite } : p
      )
    );

    try {
      const method = currentFavorite ? "DELETE" : "POST";
      const res = await fetch(
        `http://localhost/tailorshop/Backend/api/products.php`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ product_id: productId }),
        }
      );

      const result = await res.json();
      if (!result.success) {
        // Agar xato bo‘lsa rollback qilamiz
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, is_favorite: currentFavorite } : p
          )
        );
        toast.error(result.message || "Xatolik yuz berdi");
      }
    } catch (error) {
      console.error("Toggle favorite error:", error);
      // Rollback
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, is_favorite: currentFavorite } : p
        )
      );
      toast.error("Sevimlilarni yangilashda xatolik");
    }
  };

  const favoriteProducts = products.filter((p) => p.is_favorite);

  // 🔹 Sevimlilar ikonkasini bosganda
  const handleFavoriteClick = () => {
    if (!userId) {
      toast.info("Iltimos, tizimga kiring.");
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
            <img
              src={TailorLogo}
              alt="Tailor Shop Namangan"
              className="logo-image"
            />
          </Link>
        </div>

        {/* Catalog */}
        <button
          className="catalog-button"
          onClick={() => setShowCatalogModal(true)}
        >
          <img src={Katalog} alt="Catalog" className="catalog-icon" />
          <span>Katalog</span>
        </button>

        {/* Search */}
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
          {/* Favorites */}
          <div
            className="favorites-icon-container"
            onClick={handleFavoriteClick}
          >
            {loadingFavorites ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <FaHeart
                className="header-icon heart-icon"
                color={favoriteProducts.length > 0 ? "red" : "gray"}
              />
            )}
            {favoriteProducts.length > 0 && (
              <span className="favorites-count">
                {favoriteProducts.length}
              </span>
            )}
          </div>

          {/* User */}
          <img
            src={User}
            alt="Account"
            className="header-icon"
            onClick={() => setShowUserSidebar(true)}
            style={{ cursor: "pointer" }}
          />

          {/* Cart */}
          <img
            src={Savat}
            alt="Cart"
            className="header-icon"
            onClick={() => setShowCartModal(true)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      {/* Modals */}
      <CatalogModal
        show={showCatalogModal}
        onHide={() => setShowCatalogModal(false)}
      />
      <CartModal show={showCartModal} onHide={() => setShowCartModal(false)} />

      <CardHeartModal
        show={showFavoritesModal}
        onHide={() => setShowFavoritesModal(false)}
        favorites={favoriteProducts}
        onToggleFavorite={toggleFavorite}
      />

      {showUserSidebar && (
        <UserSidebar
          user={null} // agar user ma’lumotlari bo‘lsa ulash mumkin
          loading={false}
          onClose={() => setShowUserSidebar(false)}
        />
      )}
    </header>
  );
};

export default Header;
