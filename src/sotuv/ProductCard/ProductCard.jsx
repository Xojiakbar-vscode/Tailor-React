import React, { useContext } from "react";
import { ProductContext } from "../../Context/FavoritesContext";  // to'g'ri pathga e'tibor bering
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const ProductCard = ({ product, toggleFavorite }) => {
  const rating = 4;
  const images = [product.main_image, ...(product.extra_images || [])];

  return (
    <article className="product-card" data-aos="fade-up">
      <div className="card">
        {/* Yurak tugmasi */}
        <div
          className={`heart ${product.is_favorite ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation(); // linkga o'tishni to'xtatadi
            toggleFavorite(product.id, product.is_favorite);
          }}
          style={{ cursor: "pointer" }}
          title={product.is_favorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
        >
          {product.is_favorite ? <FaHeart color="red" /> : <FaRegHeart />}
        </div>

        {/* Mahsulot rasmlari swiper */}
        <Link to={`/batafsil/${product.id}`} className="product-link">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
          >
            {images.length > 0 ? (
              images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={product.name || "Mahsulot rasmi"}
                    onError={(e) => (e.target.src = "/placeholder.png")}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <img src="/placeholder.png" alt="Placeholder" />
              </SwiperSlide>
            )}
          </Swiper>
        </Link>
      </div>

      {/* Mahsulot nomi va tavsifi */}
      <h3>{product.name || "Nomsiz mahsulot"}</h3>
      <p>{product.description || "Ma'lumot yo'q"}</p>

      {/* Reyting */}
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar key={star} className={star <= rating ? "checked" : ""} />
        ))}
      </div>

      {/* Narx va buyurtma tugmasi */}
      <div className="price">
        <p>{product.price ? product.price.toLocaleString("ru-RU") : 0} so'm</p>
        <button
          className="add-to-cart"
          onClick={(e) => {
            e.stopPropagation();
            alert(`Mahsulot: ${product.name} buyurtma qilindi!`);
          }}
        >
          Buyurtma berish
        </button>
      </div>
    </article>
  );
};

const ProductCards = () => {
  // Kontekstdan mahsulotlar va toggleFavorite funksiyasini oling
  const { products, loading, toggleFavorite } = useContext(ProductContext);

  if (loading) return <p>Yuklanmoqda...</p>;

  if (products.length === 0) return <p>Mahsulotlar topilmadi</p>;

  return (
    <section className="card_container">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </section>
  );
};

export default ProductCards;
