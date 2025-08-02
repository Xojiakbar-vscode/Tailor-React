// components/CartModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import UserIcon from "../../images/user.png";
import ProductImage from "../../assets/satin.png";
import "./CartModal.css"

const CartModal = ({ show, onHide }) => {
  const [showOldOrders, setShowOldOrders] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const swipeBtnRef = useRef(null);

  const confirmOrder = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      setOrderConfirmed(false);
      // reset position
      if (swipeBtnRef.current) {
        const handle = swipeBtnRef.current.querySelector(".swipe-handle");
        if (handle) handle.style.left = "0px";
      }
    }, 10000);
  };

  useEffect(() => {
    if (!show) return; // Modal yopiq bo‘lsa ishlatmaymiz

    const btn = swipeBtnRef.current;
    if (!btn) return;

    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      currentX = e.clientX;
      const deltaX = currentX - startX;
      const maxDelta = btn.offsetWidth - 50;
      const newLeft = Math.min(Math.max(0, deltaX), maxDelta);
      btn.querySelector(".swipe-handle").style.left = `${newLeft}px`;

      if (newLeft === maxDelta) {
        btn.classList.add("active");
        isDragging = false;
        confirmOrder();
      }
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      if (!btn.classList.contains("active")) {
        btn.querySelector(".swipe-handle").style.left = "0px";
      }
    };

    // Touch events
    const handleTouchStart = (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      e.preventDefault();
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
      const maxDelta = btn.offsetWidth - 50;
      const newLeft = Math.min(Math.max(0, deltaX), maxDelta);
      btn.querySelector(".swipe-handle").style.left = `${newLeft}px`;

      if (newLeft === maxDelta) {
        btn.classList.add("active");
        isDragging = false;
        confirmOrder();
      }
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      if (!btn.classList.contains("active")) {
        btn.querySelector(".swipe-handle").style.left = "0px";
      }
    };

    // Add listeners
    btn.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    btn.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    // Cleanup
    return () => {
      btn.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      btn.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} fullscreen className="cart-modal">
      <Modal.Body>
        <button className="custom-close" onClick={onHide}>
          ×
        </button>

        <section className="container-modal">
          {/* Mijoz ma'lumotlari */}
          <div className="usersection">
            <div className="img-user-container">
              <img src={UserIcon} alt="Mijoz" />
            </div>
            <h2>Mijoz</h2>
            <a href="tel:+998913560408">+998 (91) 356-04-08</a>
            <div className="button-footer">
              <button
                onClick={() => setShowOldOrders(false)}
                className={!showOldOrders ? "active" : ""}
              >
                Yangi buyurtmalar
              </button>
              <button
                onClick={() => setShowOldOrders(true)}
                className={showOldOrders ? "active" : ""}
              >
                Qilingan buyurtmalar
              </button>
            </div>
          </div>

          {/* Qilingan buyurtmalar */}
          {showOldOrders && (
            <div className="cartsection">
              <div className="cart-header">
                <h2>Buyurtma qilingan mahsulotlar</h2>
              </div>
              <div className="mahsulot__cards block">
                <img src={ProductImage} alt="Mahsulot" />
                <div className="mahsulot__card__tavsif">
                  <p>Mahsulot: Ip</p>
                  <p>Nomi: Ming Long #500</p>
                  <p>Buyurtma sanasi: 03.06.25</p>
                </div>
              </div>
            </div>
          )}

          {/* Yangi buyurtmalar */}
          {!showOldOrders && (
            <div className="cartsection">
              <div className="cart-header">
                <h2>Yangi buyurtmalar</h2>
              </div>
              <div className="card-product-container">
                <article>
                  <div className="photo-container">
                    <span className="x-icon">×</span>
                    <img src={ProductImage} alt="Mahsulot" />
                  </div>
                  <div className="product-info">
                    <h3>Ming Long</h3>
                    <p>#416; 40/2s</p>
                  </div>
                </article>
              </div>

              {/* Swipe Button */}
              <div className="card-product-footer">
                <div
                  className={`swipe-btn ${orderConfirmed ? "active" : ""}`}
                  ref={swipeBtnRef}
                >
                  <div className="swipe-handle">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                  <div className="swipe-text">
                    <span className="initial-text">Buyurtmani tasdiqlash</span>
                    <span className="confirmed-text">
                      Buyurtma tasdiqlandi!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
