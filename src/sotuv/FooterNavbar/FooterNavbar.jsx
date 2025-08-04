import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FooterNavbar.css";
import Like from "../../images/Live.png"
import Logo from "../../images/Logo.png"
import Savat from "../../images/Savat.png"
import Katalog from "../../images/Katalog.png"
import User from "../../images/user.png"


const FooterNavbar = () => {
  return (
    <div className="footer-navbar">
      <div>
      
          <img src={Logo} alt="" />
          <p>Sahifaga qaytish</p>
  
      </div>

      <div>
        <img
          src={Savat}
          alt=""
          data-bs-toggle="modal"
          data-bs-target="#cartModal"
          style={{ cursor: "pointer" }}
        />
        <p>Buyurtmalar</p>
      </div>

      <div>
        <img src={Like} alt="" />
        <p>Yoqtirganlarim</p>
      </div>

      <div className="katalog catalog-trigger-1" id="catalogTrigger1">
        <img src={Katalog} alt="" />
        <p>Katalog</p>
      </div>

      <div>
        <img src={User} alt="" />
        <p>Profil</p>
      </div>
    </div>
  );
};

export default FooterNavbar;
