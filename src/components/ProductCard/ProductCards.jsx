import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import CardHeartModal from "../../sotuv/CardHeartModal/CardHeartModal";
import GreenAlert from "../GreenAlert/GreenAlert";
 // Alert komponentini ulash
import "./ProductCard.css";

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertPos, setAlertPos] = useState("right");

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost/tailorshop/Backend/api/check_auth.php", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.authenticated) {
        setUserId(data.user.id);
      } else {
        setUserId(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUserId(null);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost/tailorshop/Backend/api/products.php", {
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        setProducts(
          data.data.map(item => ({
            id: item.id,
            name: item.name,
            description: item.short_description,
            price: parseFloat(item.price),
            image: item.image_url || "/placeholder.png",
            is_favorite: Boolean(item.is_favorite),
          }))
        );
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Fetch products error:", error);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  const toggleFavorite = async (productId, currentFavorite) => {
    if (!userId) {
      setAlertMsg("Sevimlilarga qo‘shish uchun tizimga kiring");
      setAlertPos("left");
      setAlertVisible(true);
      return;
    }

    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, is_favorite: !currentFavorite } : p
      )
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
          prev.map(p =>
            p.id === productId ? { ...p, is_favorite: currentFavorite } : p
          )
        );
        setAlertMsg(result.message || "Xatolik yuz berdi");
        setAlertPos("left");
        setAlertVisible(true);
      } else {
        // Alert xabari
        if (currentFavorite) {
          setAlertMsg("Sevimlilardan o‘chirildi");
        setAlertPos("right");

        } else {
          setAlertMsg("Sevimlilarga qo‘shildi");
        setAlertPos("left");

        }
        setAlertVisible(true);
      }
    } catch (error) {
      console.error("Toggle favorite error:", error);
      setProducts(prev =>
        prev.map(p =>
          p.id === productId ? { ...p, is_favorite: currentFavorite } : p
        )
      );
      setAlertMsg("Server bilan aloqa yo‘q");
      setAlertPos("left");
      setAlertVisible(true);
    }
  };

  const favoriteProducts = products.filter(p => p.is_favorite);
    return (
      <>
        {/* Sevimlilarni ochish tugmasi */}
      

        <section className="card_container">
          {products.length > 0 ? (
            products.map(product => (
              <article key={product.id} className="product-card">
                <div style={{position:"static"}}
                  className={`heart ${product.is_favorite ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id, product.is_favorite);
                  }}
                >
                  {product.is_favorite ? <FaHeart color="red" /> : <FaRegHeart />}
                </div>

                <Link to={`/batafsil/${product.id}`} className="product-link">
                  <img
                    src={product.image}
                    alt={product.name || "Mahsulot rasmi"}
                    onError={(e) => { e.target.src = "/placeholder.png"; }}
                  />
                  <h3>{product.name || "Nomsiz mahsulot"}</h3>
                  <p>{product.price ? product.price.toLocaleString("ru-RU") : 0} so'm</p>
                </Link>

                <button
                  className="add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Mahsulot: ${product.name} buyurtma qilindi!`);
                  }}
                >
                  Buyurtma berish
                </button>
              </article>
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
        {/* Modal */}
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
