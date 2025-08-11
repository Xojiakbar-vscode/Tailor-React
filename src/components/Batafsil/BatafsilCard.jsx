import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const BatafsilCard = () => {
  const { id } = useParams(); // React Router-dan id olamiz
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost/tailorshop/Backend/api/product_detail.php?id=${id}`,
          { credentials: "include" }
        );
        const data = await res.json();

        if (data.success && data.data) {
          setProduct(data.data);
        } else {
          setErrorMsg(data.message || "Mahsulot topilmadi");
        }
      } catch (error) {
        setErrorMsg("Server bilan aloqa yo‘q");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (errorMsg) return <p style={{ color: "red" }}>{errorMsg}</p>;
  if (!product) return null;

  // Rasm slider uchun barcha rasmlar: asosiy + qolganlar
  const images = [product.main_image, ...(product.extra_images || [])].filter(Boolean);

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", padding: 20, border: "1px solid #ddd", borderRadius: 10 }}>
      <h1 style={{ marginBottom: 10 }}>{product.name || "Nomsiz mahsulot"}</h1>

      {/* Swiper slider */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        style={{ borderRadius: 8, marginBottom: 20 }}
      >
        {images.length > 0 ? (
          images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={product.name || "Mahsulot rasmi"}
                style={{ width: "100%", borderRadius: 8, maxHeight: 400, objectFit: "contain" }}
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              src="/placeholder.png"
              alt="Placeholder"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </SwiperSlide>
        )}
      </Swiper>

      <p style={{ marginBottom: 10 }}>{product.short_description || "Tavsif mavjud emas"}</p>

      <p style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>
        {product.price
          ? parseFloat(product.price).toLocaleString("ru-RU") + " so'm"
          : "Narx mavjud emas"}
      </p>

      <button
        onClick={() => alert(`Buyurtma berildi: ${product.name}`)}
        style={{
          padding: "10px 20px",
          backgroundColor: "green",
          color: "#fff",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        Buyurtma berish
      </button>
    </div>
  );
};

export default BatafsilCard;
