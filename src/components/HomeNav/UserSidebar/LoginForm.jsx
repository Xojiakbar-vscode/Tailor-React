import React, { useState } from 'react';
import './UserSidebar.css';

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Maydonlarni tekshirish
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Iltimos, email va parolni kiriting');
      return;
    }

    // Email formatini tekshirish
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Iltimos, to\'g\'ri email manzilini kiriting');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      const result = await onLogin(formData);
      if (!result.success) {
        setError(result.message || 'Kirish muvaffaqiyatsiz tugadi');
      }
    } catch (err) {
      setError('Xatolik yuz berdi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Kirish</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Parol</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Kirilmoqda...' : 'Kirish'}
        </button>
      </form>
      <p className="switch-auth">
        Hisobingiz yo'qmi?{' '}
        <button 
          type="button" 
          onClick={onSwitchToRegister}
          disabled={loading}
        >
          Ro'yxatdan o'tish
        </button>
      </p>
    </div>
  );
};

export default LoginForm;