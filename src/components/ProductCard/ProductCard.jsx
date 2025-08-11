import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import CardHeartModal from "../../sotuv/CardHeartModal/CardHeartModal";
import GreenAlert from "../GreenAlert/GreenAlert";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProductCard.css";

import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const ProductCard = ({ product, userId, toggleFavorite, showAlert }) => {
  const [rating] = useState(4);

  // Slayder uchun barcha rasmlar
  const images = [product.main_image, ...(product.extra_images || [])];

  return (
   <article className="product-card" data-aos="fade-up">
  <div className="card">
    <div
      className={`heart ${product.is_favorite ? "active" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(product.id, product.is_favorite);
      }}
    >
      {product.is_favorite ? <FaHeart color="red" /> : <FaRegHeart />}
    </div>

    <Link to={`/batafsil/${product.id}`} className="product-link">
    <Swiper
  modules={[Pagination, Autoplay]}
  pagination={{ clickable: true }}
  spaceBetween={10}
  slidesPerView={1}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  loop={true}
>
  {images.length > 0 ? (
    images.map((img, idx) => (
      <SwiperSlide key={idx}>
        <img
          src={img}
          alt={product.name || "Mahsulot rasmi"}
          onError={(e) => {
            e.target.src = "/placeholder.png";
          }}
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

  <h3>{product.name || "Nomsiz mahsulot"}</h3>
  <p>{product.description || "Ma'lumot yo'q"}</p>
  <div className="rating">
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar key={star} className={star <= rating ? "checked" : ""} />
    ))}
  </div>
  <div className="price">
    <p>{product.price ? product.price.toLocaleString("ru-RU") : 0} so'm</p>
    <button
      className="add-to-cart"
      onClick={(e) => {
        e.stopPropagation();
        showAlert(
          `Mahsulot: ${product.name} buyurtma qilindi!`,
          "right"
        );
      }}
    >
      Buyurtma berish
    </button>
  </div>
</article>
  );
};

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertPos, setAlertPos] = useState("right");

  const showAlert = (message, position = "right") => {
    setAlertMsg(message);
    setAlertPos(position);
    setAlertVisible(true);
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost/tailorshop/Backend/api/check_auth.php", {
        credentials: "include",
      });
      const data = await res.json();
      setUserId(data.authenticated ? data.user.id : null);
    } catch {
      setUserId(null);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost/tailorshop/Backend/api/products.php", {
        credentials: "include",
      });
      const data = await res.json();
console.log("phpdata", data.data);

      if (data.success) {
        setProducts(
          data.data.map(item => ({
            id: item.id,
            name: item.name,
            description: item.short_description,
            price: parseFloat(item.price),
            main_image: item.main_image || "/placeholder.png",
            extra_images: item.extra_images ? item.extra_images : [],
            is_favorite: Boolean(item.is_favorite),
          }))
        );
      }
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  const toggleFavorite = async (productId, currentFavorite) => {
    if (!userId) {
      showAlert("Sevimlilarga qo'shish uchun tizimga kiring", "left");
      return;
    }
    setProducts(prev =>
      prev.map(p => p.id === productId ? { ...p, is_favorite: !currentFavorite } : p)
    );
    try {
      const method = currentFavorite ? "DELETE" : "POST";
      const res = await fetch(`http://localhost/tailorshop/Backend/api/products.php`, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: productId }),
      });
      const result = await res.json();
      if (!result.success) {
        setProducts(prev =>
          prev.map(p => p.id === productId ? { ...p, is_favorite: currentFavorite } : p)
        );
        showAlert(result.message || "Xatolik yuz berdi", "left");
      } else {
        showAlert(currentFavorite ? "Sevimlilardan o'chirildi" : "Sevimlilarga qo'shildi", currentFavorite ? "right" : "left");
      }
    } catch {
      setProducts(prev =>
        prev.map(p => p.id === productId ? { ...p, is_favorite: currentFavorite } : p)
      );
      showAlert("Server bilan aloqa yo'q", "left");
    }
  };

  const favoriteProducts = products.filter(p => p.is_favorite);

  return (
    <>
      <section className="card_container">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              userId={userId}
              toggleFavorite={toggleFavorite}
              showAlert={showAlert}
            />
          ))
        ) : (
          <p>Mahsulotlar topilmadi</p>
        )}
      </section>

      <GreenAlert
        show={alertVisible}
        message={alertMsg}
        position={alertPos}
        duration={3000}
        onClose={() => setAlertVisible(false)}
      />

      <CardHeartModal
        show={showModal}
        onHide={() => setShowModal(false)}
        favorites={favoriteProducts}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
};

export default ProductCards;
