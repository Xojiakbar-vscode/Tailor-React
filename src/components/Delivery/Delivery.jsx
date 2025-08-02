import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import deliveryImage from "../../assets/delevery.png";
import "./Delivery.css";

const Delivery = () => {
  return (
    <section className="yetqazish" data-aos="fade-up">
      <div className="text">
        <p>O'zbekiston bo'ylab yetqazib beramiz!</p>
        <FaCheckCircle className="check-icon" />
      </div>
      <img 
        src={deliveryImage} 
        alt="Yetkazib berish xizmati" 
        className="delivery-image"
      />
    </section>
  );
};

export default Delivery;