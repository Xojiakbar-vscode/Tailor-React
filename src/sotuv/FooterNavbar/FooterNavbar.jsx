import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FooterNavbar.css";
import Like from "../../images/Live.png"
import Logo from "../../images/Logo.png"
import Savat from "../../images/Savat.png"
import Katalog from "../../images/Katalog.png"
import User from "../../images/user.png"
import { Link } from 'react-router-dom';

import CatalogModal from '../CatalogModal/CatalogModal';
import CartModal from '../CartModal/CartModal';

const FooterNavbar = () => {
  const [showCatalogModal, setShowCatalogModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
  return (
    <div className="footer-navbar">
  <Link to="/">
      <div>
    
          <img src={Logo} alt="" />
          <p>Sahifaga qaytish</p>
      </div>
  </Link>

      <div >
        <img
          src={Savat}
          alt=""
         onClick={() => setShowCartModal(true)}
        />
        <p>Buyurtmalar</p>
      </div>

      <div>
        <img src={Like} alt="" />
        <p>Yoqtirganlarim</p>
      </div>

      <div className="katalog catalog-trigger-1"  onClick={() => setShowCatalogModal(true)}>
        <img src={Katalog} alt="" />
        <p>Katalog</p>
      </div>

      <div>
        <img src={User} alt="" />
        <p>Profil</p>
      </div>
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
