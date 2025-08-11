import React, { createContext, useState, useEffect, useCallback } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Foydalanuvchi holatini tekshirish
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("http://localhost/tailorshop/Backend/api/check_auth.php", {
        credentials: "include",
      });
      const data = await res.json();
      setUserId(data.authenticated ? data.user.id : null);
    } catch (error) {
      console.error("checkAuth error:", error);
      setUserId(null);
    }
  }, []);

  // Mahsulotlarni olish
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost/tailorshop/Backend/api/products.php", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setProducts(
          data.data.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.short_description,
            price: parseFloat(item.price),
            main_image: item.main_image || "/placeholder.png",
            extra_images: item.extra_images || [],
            is_favorite: Boolean(item.is_favorite),
          }))
        );
      } else {
        setProducts([]); // Agar serverdan success false bo‘lsa tozalash
      }
    } catch (error) {
      console.error("Fetch products error:", error);
      setProducts([]); // Xatoda tozalash
    } finally {
      setLoading(false);
    }
  }, []);

  // Yurak holatini toggle qilish
  const toggleFavorite = async (productId, currentFavorite) => {
    if (!userId) {
      alert("Sevimlilarga qo'shish uchun tizimga kiring.");
      return;
    }

    // Optimistik UI update (avval o‘zimiz o‘zgartiramiz)
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, is_favorite: !currentFavorite } : p
      )
    );

    try {
      const method = currentFavorite ? "DELETE" : "POST";
      const res = await fetch("http://localhost/tailorshop/Backend/api/products.php", {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: productId }),
      });
      const result = await res.json();

      if (!result.success) {
        // Agar serverdan xato bo‘lsa rollback qilamiz
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, is_favorite: currentFavorite } : p
          )
        );
        alert(result.message || "Xatolik yuz berdi");
      }
    } catch (error) {
      // Server bilan aloqa yo‘q bo‘lsa rollback
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, is_favorite: currentFavorite } : p
        )
      );
      alert("Server bilan aloqa yo'q");
    }
  };

  // Komponent mount bo‘lganida ma’lumotlarni olish va authni tekshirish
  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, [checkAuth, fetchProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        userId,
        toggleFavorite,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
