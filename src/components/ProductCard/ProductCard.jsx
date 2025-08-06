import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import "./ProductCard.css";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(5); // Default 5 yulduz

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
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => (e.target.src = "/placeholder-product.jpg")}
        />
      </div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
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
  const [products, setProducts] = useState([]);

  // API dan mahsulotlarni olish
useEffect(() => {
  fetch("http://localhost/tailorshop/Backend/api/products.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data); // Mahsulotlar ro‘yxatini ko‘ramiz

      // API ma'lumotlarini React kartochkalar uchun tayyorlash
      const mappedProducts = data.data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.short_description,
        price: parseFloat(item.price),
        discount_price: parseFloat(item.discount_price),
        rating: parseFloat(item.rating),
        review_count: item.review_count,
        image: `http://localhost/tailorshop/Backend/${item.image_url}`,
        is_favorite: Boolean(item.is_favorite)
      }));

      setProducts(mappedProducts);
    })
    .catch((error) => console.error("Mahsulotlarni olishda xatolik:", error));
}, []);

  return (
    <>
      <section className="card_container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <div className="button">
        <button className="yana">
          <Link to="/yana" className="yana">yana</Link>
        </button>
      </div>
    </>
  );
};

export default ProductCards;
