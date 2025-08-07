import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserProfile from './UserProfile';
import './UserSidebar.css';

const UserSidebar = ({ user, loading, onLogin, onRegister, onLogout, onClose }) => {
  const [authMode, setAuthMode] = React.useState('login');

  return (
    <>
      <div className="user-sidebar-overlay " onClick={onClose}></div>
      <div className="user-sidebar-container  ">
        <button className="close-btn" onClick={onClose}>×</button>
        
        {loading ? (
          <div className="loading-spinner">Yuklanmoqda...</div>
        ) : user ? (
          <UserProfile user={user} onLogout={onLogout} />
        ) : (
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