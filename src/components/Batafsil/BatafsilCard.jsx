import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BatafsilCard = () => {
  const { id } = useParams();
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.name || "Nomsiz mahsulot"}</h1>
      <img
        src={
          product.image_url
            ? `http://localhost/tailorshop/Backend/${product.image_url}`
            : "/placeholder.png"
        }
        alt={product.name || "Mahsulot rasmi"}
        style={{ maxWidth: "300px", borderRadius: "8px" }}
        onError={(e) => (e.target.src = "/placeholder.png")}
      />
      <p>{product.short_description || "Tavsif mavjud emas"}</p>
      <p>
        {product.price
          ? parseFloat(product.price).toLocaleString("ru-RU")
          : 0}{" "}
        so'm
      </p>
      <button
        onClick={() => alert(`Buyurtma berildi: ${product.name}`)}
        style={{
          padding: "10px 20px",
          backgroundColor: "green",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Buyurtma berish
      </button>
    </div>
  );
};

export default BatafsilCard;
