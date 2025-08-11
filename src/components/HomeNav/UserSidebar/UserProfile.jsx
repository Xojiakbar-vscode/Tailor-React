import React, { useState, useEffect, useRef } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const UserProfile = ({ user, onLogout, onUpdateProfile, showOldOrders, setShowOldOrders }) => {
  const [profileImage, setProfileImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user?.rasm_url) {
      setProfileImage(`http://localhost/tailorshop/Backend${user.rasm_url}`);
    } else {
      setProfileImage("");
    }
  }, [user?.rasm_url]);

  const handleLogout = async () => {
    try {
      const result = await onLogout();
      if (!result?.success) {
        alert(result?.message || "Chiqishda xatolik yuz berdi");
      }
    } catch (error) {
      console.error("Chiqishda xatolik:", error);
      alert("Chiqish jarayonida xatolik yuz berdi");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Fayl hajmini tekshirish (masalan, 2MB dan oshmasligi)
      if (file.size > 2 * 1024 * 1024) {
        alert("Rasm hajmi 2MB dan katta bo'lmasligi kerak");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Vaqtincha preview
        handleUploadImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async (file) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", user.id);

      const response = await fetch(
        "http://localhost/tailorshop/Backend/api/upload_profile_image.php",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.imageUrl) {
        throw new Error(data.message || "Rasm yuklashda xatolik");
      }

      if (onUpdateProfile) {
        await onUpdateProfile({ ...user, rasm_url: data.imageUrl });
      }
    } catch (error) {
      console.error("Rasm yuklashda xatolik:", error);
      alert("Rasm yuklash muvaffaqiyatsiz tugadi: " + error.message);
      // Oldingi rasmini qayta tiklash
      setProfileImage(
        user?.rasm_url ? `http://localhost/tailorshop/Backend${user.rasm_url}` : ""
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <aside className="usersection1">
      <div className="img-user-container">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Mijoz"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
          />
        ) : (
          <FaRegCircleUser style={{ fontSize: "5rem", color: "#ccc" }} />
        )}
      </div>
      
      <h2 style={{ margin: "1rem 0 0.5rem" }}>
        {user?.ism || "Ism"} {user?.familiya || "Familiya"}
      </h2>
      
      <a 
        href={`tel:${user?.telefon || "+998913560408"}`}
        style={{ 
          display: "block", 
          marginBottom: "1rem",
          color: "#333",
          textDecoration: "none"
        }}
      >
        {user?.telefon || "+998 (91) 356-04-08"}
      </a>

      {/* Rasmni o'zgartirish tugmasi */}
      <button
        className="change-image-btn"
        onClick={() => fileInputRef.current.click()}
        disabled={isUploading}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ddd",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "1rem",
          width: "100%"
        }}
      >
        {isUploading ? "Yuklanmoqda..." : "Rasmni o'zgartirish"}
      </button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: "none" }}
        disabled={isUploading}
      />

      {/* Yangi buyurtmalar / Qilingan buyurtmalar tugmalari */}
      <div className="button-footer" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => setShowOldOrders(false)}
          className={!showOldOrders ? "active" : ""}
          style={{
            flex: 1,
            padding: "0.5rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: !showOldOrders ? "#4CAF50" : "#f0f0f0",
            color: !showOldOrders ? "white" : "#333",
            cursor: "pointer"
          }}
        >
          Yangi buyurtmalar
        </button>
        <button
          onClick={() => setShowOldOrders(true)}
          className={showOldOrders ? "active" : ""}
          style={{
            flex: 1,
            padding: "0.5rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: showOldOrders ? "#4CAF50" : "#f0f0f0",
            color: showOldOrders ? "white" : "#333",
            cursor: "pointer"
          }}
        >
          Qilingan buyurtmalar
        </button>
      </div>

      {/* Chiqish tugmasi */}
      <button
        onClick={handleLogout}
        className="logout-btn"
        disabled={isUploading}
        style={{
          marginTop: "1.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          width: "100%"
        }}
      >
        Chiqish
      </button>
    </aside>
  );
};

export default UserProfile;