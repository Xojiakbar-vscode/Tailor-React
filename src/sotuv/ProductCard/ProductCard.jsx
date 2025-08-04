import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import satinImg from "../../assets/satin.png"; // ✅ Bir marta import qilinadi

// import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(4);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <article className="product-card" data-aos="fade-up">
      <div className="card">
        <div
          className={`heart ${isFavorite ? "active" : ""}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </div>
        <img src={product.image} alt={product.name} />
      </div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={star <= rating ? "checked" : ""}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <div className="price">
        <button className="add-to-cart">Buyurtma berish</button>
      </div>
    </article>
  );
};

const ProductCards = () => {
  // ✅ 10 ta mahsulot (1000+ mahsulotlar uchun ham shu struktura ishlaydi)
  const products = [
    { id: 1, name: "Mahsulot nomi 1", description: "Qisqacha ma'lumot", image: satinImg },
    { id: 2, name: "Mahsulot nomi 2", description: "Qisqacha ma'lumot", image: satinImg },
    { id: 3, name: "Mahsulot nomi 3", description: "Qisqacha ma'lumot", image: satinImg },
    { id: 4, name: "Mahsulot nomi 4", description: "Qisqacha ma'lumot", image: satinImg },
    { id: 5, name: "Mahsulot nomi 5", description: "Qisqacha ma'lumot", image: satinImg },
    { id: 6, name: "Mahsulot nomi 6", description: "Qisqacha ma'lumot", image: satinImg },
    { id: 7, name: "Mahsulot nomi 7", description: "Qisqacha ma'lumot", image: satinImg },
    { id: 8, name: "Mahsulot nomi 8", description: "Qisqacha ma'lumot", image: satinImg },
    { id: 9, name: "Mahsulot nomi 9", description: "Qisqacha ma'lumot", image: satinImg },
    { id: 10, name: "Mahsulot nomi 10", description: "Qisqacha ma'lumot", image: satinImg },
  ];

  return (
    <>
      <section className="card_container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
};

export default ProductCards;
