import React, { useState, useRef, useEffect } from 'react';
import { FaRegCircleUser } from "react-icons/fa6";

const UserProfile = ({ user, onLogout, onUpdateProfile }) => {
  const [profileImage, setProfileImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Faqat birinchi marta yoki user.rasm_url o'zgarganda yangilash
  useEffect(() => {
    if (user.rasm_url) {
      setProfileImage(`http://localhost/tailorshop/Backend${user.rasm_url}`);
    } else {
      setProfileImage('');
    }
  }, [user.rasm_url]);

  const handleLogout = async () => {
    const result = await onLogout();
    if (!result.success) {
      alert(result.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
      formData.append('image', file);
      formData.append('userId', user.id);

      const response = await fetch('http://localhost/tailorshop/Backend/api/upload_profile_image.php', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const data = await response.json();
      
      if (!response.ok || !data.imageUrl) {
        throw new Error(data.message || 'Rasm yuklashda xatolik');
      }

      // Asosiy holatni yangilash
      if (onUpdateProfile) {
        await onUpdateProfile({ ...user, rasm_url: data.imageUrl });
      }

      // Bu yerda setProfileImage qilish shart emas, chunki useEffect yangi rasm_url bilan qayta render qiladi
    } catch (error) {
      console.error('Rasm yuklashda xatolik:', error);
      alert('Rasm yuklash muvaffaqiyatsiz tugadi');
      // Rasm yuklash muvaffaqiyatsiz tugasa, oldingi rasmg qaytamiz
      setProfileImage(user.rasm_url ? `http://localhost/tailorshop/${user.rasm_url}` : '');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-image-container">
          {profileImage ? (
            <img 
              src={profileImage} 
              alt={`${user.ism} ${user.familiya}`} 
              className="profile-image"
              style={{ opacity: isUploading ? 0.7 : 1 }}
            />
          ) : (
            <FaRegCircleUser className="profile-icon" style={{ fontSize: '100px', color: '#ccc' }} />
          )}

          <button 
            className="change-image-btn"
            onClick={() => fileInputRef.current.click()}
            disabled={isUploading}
          >
            {isUploading ? 'Yuklanmoqda...' : 'Rasmni o\'zgartirish'}
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
            disabled={isUploading}
          />
        </div>
        <h2>{user.ism} {user.familiya}</h2>
      </div>

      <div className="user-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Telefon:</strong> {user.telefon}</p>
      </div>

      <button onClick={handleLogout} className="logout-btn" disabled={isUploading}>
        Chiqish
      </button>
    </div>
  );
};

export default UserProfile;