import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserProfile from './UserProfile';
import './UserSidebar.css';

const UserSidebar = ({
  user,
  loading,
  onLogin,
  onRegister,
  onLogout,
  onUpdateProfile,
  showOldOrders,
  setShowOldOrders,
  onClose,
}) => {
  const [authMode, setAuthMode] = useState('login');

  return (
    <>
      {/* Oqartirilgan fon, ustiga bosilganda sidebar yopiladi */}
      <div className="user-sidebar-overlay" onClick={onClose}></div>

      <div className="user-sidebar-container">
        {/* Yopish tugmasi */}
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {/* Yuklanmoqda */}
        {loading ? (
          <div className="loading-spinner">Yuklanmoqda...</div>
        ) : user ? (
          // Agar user kirgan bo'lsa, profil ko'rsatiladi
          <UserProfile
            user={user}
            onLogout={onLogout}
            onUpdateProfile={onUpdateProfile}
            showOldOrders={showOldOrders}
            setShowOldOrders={setShowOldOrders}
          />
        ) : (
          // Aks holda login yoki register formasi ko'rsatiladi
          <>
            {authMode === 'login' ? (
              <LoginForm
                onLogin={onLogin}
                onSwitchToRegister={() => setAuthMode('register')}
              />
            ) : (
              <RegisterForm
                onRegister={onRegister}
                onSwitchToLogin={() => setAuthMode('login')}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserSidebar;
