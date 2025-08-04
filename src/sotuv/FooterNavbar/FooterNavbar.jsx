import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FooterNavbar.css";

import Like from "../../images/Live.png";
import Logo from "../../images/Logo.png";
import Savat from "../../images/Savat.png";
import Katalog from "../../images/Katalog.png";
import User from "../../images/user.png";

import { Link } from "react-router-dom";
import CatalogModal from "../CatalogModal/CatalogModal";
import CartModal from "../CartModal/CartModal";

const FooterNavbar = () => {
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  return (
    <div className="footer-navbar">
      {/* Bosh sahifa */}
      <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{textDecoration: "none"}}>
        <div>
          <img src={Logo} alt="Bosh sahifa" />
          <p >Sahifaga qaytish</p>
        </div>
      </Link>

      {/* Buyurtmalar */}
      <div onClick={() => setShowCartModal(true)} style={{ cursor: "pointer" }}>
        <img src={Savat} alt="Buyurtmalar" />
        <p>Buyurtmalar</p>
      </div>

      {/* Yoqtirganlarim */}
      <div>
        <img src={Like} alt="Yoqtirganlarim" />
        <p>Yoqtirganlarim</p>
      </div>

      {/* Katalog */}
      <div
        className="katalog catalog-trigger-1"
        onClick={() => setShowCatalogModal(true)}
        style={{ cursor: "pointer"}}
      >
        <img src={Katalog} alt="Katalog" style={{width: "6vw", height: "6vw" }} />
        <p>Katalog</p>
      </div>

      {/* Profil */}
      <div>
        <img src={User} alt="Profil" />
        <p>Profil</p>
      </div>

      {/* Modallar */}
      <CatalogModal
        show={showCatalogModal}
        onHide={() => setShowCatalogModal(false)}
      />
      <CartModal
        show={showCartModal}
        onHide={() => setShowCartModal(false)}
      />
    </div>
  );
};

export default FooterNavbar;
