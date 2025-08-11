import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineArrowRight } from "react-icons/ai";
import UserIcon from "../../images/user.png";
import ProductImage from "../../assets/satin.png";
import "./CartModal.css";
import useAuth from '../../../hooks/useAuth';

import UserProfile from "../../components/HomeNav/UserSidebar/UserProfile";
import UserSidebar from "../../components/HomeNav/UserSidebar/UserSidebar";



const CartModal = ({ show, onHide }) => {
  const [showOldOrders, setShowOldOrders] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const swipeBtnRef = useRef(null);
    const [showUserSidebar, setShowUserSidebar] = useState(false);
  
  
     const { user, loading, login, logout, register, updateProfile } = useAuth();
  

  const confirmOrder = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      setOrderConfirmed(false);
      if (swipeBtnRef.current) {
        const handle = swipeBtnRef.current.querySelector(".swipe-handle");
        if (handle) handle.style.left = "0px";
      }
    }, 2000);
  };

  // 📌 Swipe drag
  useEffect(() => {
    if (!show) return;
    const btn = swipeBtnRef.current;
    if (!btn) return;

    let isDragging = false;
    let startX = 0;

    const handleDown = (x) => {
      isDragging = true;
      startX = x;
    };

    const handleMove = (x) => {
      if (!isDragging) return;
      const deltaX = x - startX;
      const maxDelta = btn.offsetWidth - 50;
      const newLeft = Math.min(Math.max(0, deltaX), maxDelta);
      btn.querySelector(".swipe-handle").style.left = `${newLeft}px`;

      if (newLeft === maxDelta) {
        btn.classList.add("active");
        isDragging = false;
        confirmOrder();
      }
    };

    const handleUp = () => {
      if (!isDragging) return;
      isDragging = false;
      if (!btn.classList.contains("active")) {
        btn.querySelector(".swipe-handle").style.left = "0px";
      }
    };

    // Mouse events
    const onMouseDown = (e) => handleDown(e.clientX);
    const onMouseMove = (e) => handleMove(e.clientX);
    const onMouseUp = handleUp;

    // Touch events
    const onTouchStart = (e) => handleDown(e.touches[0].clientX);
    const onTouchMove = (e) => handleMove(e.touches[0].clientX);
    const onTouchEnd = handleUp;

    btn.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    btn.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      btn.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      btn.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [show]);

  // 📌 Click outside → panel yopish
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sideOpen &&
        !e.target.closest(".usersection") &&
        !e.target.closest(".side-toggle-btn")
      ) {
        setSideOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sideOpen]);

  return (
    <Modal show={show} onHide={onHide} fullscreen className="cart-modal">
      <Modal.Body>
        <button className="custom-close" style={{border: "none"}} onClick={onHide}>×</button>
        {/* Bars icon */}
        <button
          className="side-toggle-btn"
          onClick={() => setSideOpen(!sideOpen)}
        >
          {sideOpen ? "✕" : "☰"}
        </button>

        <section className="container-modal">
          {/* Chap panel */}
          <aside className={`usersection ${sideOpen ? "open " : "none"}`}>
         // CartModal.js
<UserSidebar
  user={user}
  loading={loading}
  onLogin={login}
  onRegister={register}
  onLogout={logout}
  onUpdateProfile={updateProfile}
  onClose={() => setSideOpen(false)}
  showOldOrders={showOldOrders}
  setShowOldOrders={setShowOldOrders}
/>
          </aside>

          {/* O‘ng panel */}
          <main className="cartsection">
            {showOldOrders ? (
              <>
              <div>
                <div className="cart-header">
                  <h2>Buyurtma qilingan mahsulotlar</h2>
                </div>
                <div className="mahsulot__cards">
                  <img src={ProductImage} alt="Mahsulot" />
                  <div className="mahsulot__card__tavsif">
                    <p>Mahsulot: Ip</p>
                    <p>Nomi: Ming Long #500</p>
                    <p>Buyurtma sanasi: 03.06.25</p>
                  </div>
                </div>
                 <div className="mahsulot__cards">
                  <img src={ProductImage} alt="Mahsulot" />
                  <div className="mahsulot__card__tavsif">
                    <p>Mahsulot: Ip</p>
                    <p>Nomi: Ming Long #500</p>
                    <p>Buyurtma sanasi: 03.06.25</p>
                  </div>
                </div>
                </div>
              </>
            ) : (
              <>
              <div>
                <div className="cart-header">
                  <h2>Yangi buyurtmalar</h2>
                </div>
                <div className="card-product-container">
                  <article style={{background: "none", boxShadow: "none"}}>
                    <div className="photo-container">
                      <span className="x-icon">×</span>
                      <img src={ProductImage} style={{width:"100%"}} alt="Mahsulot" />
                    </div>
                    <div className="product-info" style={{textAlign: "center"}}>
                      <h3>Ming Long</h3>
                      <p>#416; 40/2s</p>
                    </div>
                  </article>
                   <article style={{background: "none", boxShadow: "none"}}>
                    <div className="photo-container">
                      <span className="x-icon">×</span>
                      <img src={ProductImage} style={{width:"100%"}} alt="Mahsulot" />
                    </div>
                    <div className="product-info" style={{textAlign: "center"}}>
                      <h3>Ming Long</h3>
                      <p>#416; 40/2s</p>
                    </div>
                  </article>
                </div>
</div>
                {/* Swipe tugma */}
                <div className="card-product-footer">
                  <div
                    className={`swipe-btn ${orderConfirmed ? "active" : ""}`}
                    ref={swipeBtnRef}
                  >
                    <div className="swipe-handle">
                      <AiOutlineArrowRight />

                    </div>
                    <div className="swipe-text">
                      <span className="initial-text">Buyurtmani tasdiqlash</span>
                      <span className="confirmed-text">Buyurtma tasdiqlandi!</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </section>
      </Modal.Body>
    </Modal>
  );
};
 

export default CartModal;
