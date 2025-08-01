// components/CartModal.jsx
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import UserIcon from '../../images/user.png';
import ProductImage from '../../assets/satin.png';

const CartModal = ({ show, onHide }) => {
  const [showOldOrders, setShowOldOrders] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const toggleOrders = () => {
    setShowOldOrders(!showOldOrders);
  };

  const confirmOrder = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      setOrderConfirmed(false);
    }, 2000);
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      fullscreen
      aria-labelledby="cartModalLabel"
      className="cart-modal"
    >
      <Modal.Body>
        <button 
          type="button" 
          className="custom-close" 
          onClick={onHide} 
          aria-label="Yopish"
        >
          ×
        </button>

        <section className="container-modal">
          {/* User Section */}
          <div className="usersection">
            <div className="img-user-container">
              <img src={UserIcon} alt="User" />
            </div>
            <h2>Mijoz</h2>
            <a href="tel:+998913560408">+998(91)-356-04-08</a>

            <div className="button-footer">
              <button 
                id="newOrdersBtn" 
                onClick={() => setShowOldOrders(false)}
                className={!showOldOrders ? 'active' : ''}
              >
                Yangi buyurtmalar
              </button>
              <button 
                id="oldOrdersBtn" 
                onClick={() => setShowOldOrders(true)}
                className={showOldOrders ? 'active' : ''}
              >
                Qilingan buyurtmalar
              </button>
            </div>
          </div>

          {/* Old Orders Section */}
          <div 
            className="cartsection" 
            id="oldOrders" 
            style={{ display: showOldOrders ? 'block' : 'none' }}
          >
            <div className="cart-header">
              <h2>Buyurtma qilingan mahsulotlar</h2>
              <div className="mahsulot__cards block">
                <img src={ProductImage} alt="Product" />
                <div className="mahsulot__card__tavsif">
                  <p>Mahsulot: Ip</p>
                  <p>Nomi: Ming Long #500</p>
                  <p>Buyurtma sanasi: 03.06.25</p>
                </div>
              </div>
            </div>
            <div className="mahsulot__cards none1">
              <img src={ProductImage} alt="Product" />
              <div className="mahsulot__card__tavsif">
                <p>Mahsulot: Ip</p>
                <p>Nomi: Ming Long #500</p>
                <p>Buyurtma sanasi: 03.06.25</p>
              </div>
            </div>
            <div className="button-footer none">
              <button 
                id="newOrdersBtn1" 
                onClick={() => setShowOldOrders(false)}
              >
                Yangi buyurtmalar
              </button>
              <button 
                id="oldOrdersBtn1" 
                onClick={() => setShowOldOrders(true)}
              >
                Qilingan buyurtmalar
              </button>
            </div>
          </div>

          {/* New Orders Section */}
          <div 
            className="cartsection" 
            id="newOrders" 
            style={{ display: !showOldOrders ? 'block' : 'none' }}
          >
            <div className="cart-header">
              <h2>Yangi buyurtmalar</h2>
            </div>
            <div className="card-product-container">
              <article>
                <div className="photo-container">
                  <span className="x-icon">×</span>
                  <img src={ProductImage} alt="Product" />
                </div>
                <div className="product-info">
                  <h3>Ming Long</h3>
                  <p>#416; 40/2s</p>
                </div>
              </article>
              {/* Additional articles can be added here */}
            </div>
            <div className="card-product-footer">
              <div 
                className={`swipe-btn ${orderConfirmed ? 'active' : ''}`} 
                id="swipeBtn"
                onClick={confirmOrder}
              >
                <div className="swipe-handle">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
                <div className="swipe-text">
                  <span className="initial-text">Buyurtmani tasdiqlash</span>
                  <span className="confirmed-text">Buyurtma tasdiqlandi!</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;