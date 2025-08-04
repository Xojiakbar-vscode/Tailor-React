import React, { useEffect, useRef } from 'react';
import { FaTelegram, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import telegramQr from '../../assets/TELEGRAM QR-CODE.svg';
import instagramQr from '../../assets/INSTAGRAM QR-CODE.svg';
import locationQr from '../../assets/LOCATION QR-CODE.svg';
import locationImg from '../../images/my.png';
import telegramIcon from '../../images/SITE telegram.png';
import instagramIcon from '../../assets/SITE instagram.svg';
import phoneIcon from '../../images/SITE phone.png';

import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);
  const locationBoxRef = useRef(null);

  useEffect(() => { 
    // Footer animation observer
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show-footer');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Location box animation observer
    const locationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 1 }
    );

    if (footerRef.current) {
      footerObserver.observe(footerRef.current);
    }

    if (locationBoxRef.current) {
      locationObserver.observe(locationBoxRef.current);
    }

    return () => {
      if (footerRef.current) footerObserver.unobserve(footerRef.current);
      if (locationBoxRef.current) locationObserver.unobserve(locationBoxRef.current);
    };
  }, []);

  return (
    <footer className="site-footer hidden-footer" ref={footerRef} id="footer">
      <p className="description">
        Mahsulotlarimiz sifatli, xarid qilish oson, va raqobatbardosh narxlarda taklif etiladi.
      </p>
      <h2 className="contact-title">Murojaat uchun:</h2>

      <div className="footer_content">
        <div className="contact-info">
          <div className="contact-item">
            <a href="https://www.instagram.com/tailor_shop_namangan?igsh=NnBmdWYxazF0ZXg2">
              <img src={instagramIcon} alt="Instagram" /> 
              tailor_shop_namangan
            </a>
          </div>
          <div className="contact-item">
            <a href="https://t.me/tailorshopnamangan1">
              <img src={telegramIcon} alt="Telegram" /> 
              tailor_shop_namangan
            </a>
          </div>
          <div className="contact-item">
            <a href="tel:+998913560508">
              <img src={phoneIcon} alt="Phone" /> 
              +998-(91)-356-04-08
            </a>
          </div>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Ismingizni kiriting" />
          <input type="text" placeholder="Telefon raqamingizni kiriting" />
          <button type="submit">Jo'natish</button>
        </form>
      </div>

      {/* <div className="qr-section">
        <div className="qr-block">
          <FaTelegram className="qr-icon" />
          <img src={telegramQr} alt="Telegram QR" width="100" />
        </div>
        <div className="qr-block">
          <FaInstagram className="qr-icon" />
          <img src={instagramQr} alt="Instagram QR" width="100" />
        </div>
        <div className="qr-wrapper">
          <div className="qr-block" id="qrHover">
            <FaMapMarkerAlt className="qr-icon" style={{ opacity: 0 }} />
            <img src={locationQr} alt="Location QR" width="100" />
          </div>

          <div className="location-box" ref={locationBoxRef} id="locationBox">
            <p className="location-text">
              Namangan shahridagi do'konimizga tashrif buyuring yoki hoziroq sayt orqali xarid qiling!
            </p>
            <div className="location-img">
              <img src={locationImg} alt="Location" />
            </div>
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;