import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import "./ProductCard.css";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(1); // Default 1 star rating

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <article className="product-card">
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
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Mahsulot nomi 1",
      description: "Mahsulot haqida qisqacha ma'lumot",
      image: "../src/assets/satin.png",
    },
    {
      id: 2,
      name: "Mahsulot nomi 2",
      description: "Mahsulot haqida qisqacha ma'lumot",
           image: "../src/assets/satin.png",

    },
    {
      id: 3,
      name: "Mahsulot nomi 3",
      description: "Mahsulot haqida qisqacha ma'lumot",
           image: "../src/assets/satin.png",

    },
    {
      id: 4,
      name: "Mahsulot nomi 4",
      description: "Mahsulot haqida qisqacha ma'lumot",
           image: "../src/assets/satin.png",

    },
    {
      id: 5,
      name: "Mahsulot nomi 5",
      description: "Mahsulot haqida qisqacha ma'lumot",
           image: "../src/assets/satin.png",

    },
  ];

  return (
    <>
    <section className="card_container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    

    </section>
     <div class="button">

   <Link to="/yana" className="yana">yana</Link>


  </div>
    </>
  );
};

export default ProductCards;