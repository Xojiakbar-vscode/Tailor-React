import React, { useState } from 'react';
import './UserSidebar.css';

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    ism: '',
    familiya: '',
    email: '',
    telefon: '',
    parol: ''
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
    if (!formData.ism || !formData.familiya || !formData.email || !formData.telefon || !formData.parol) {
      setError('Barcha maydonlarni to\'ldirish shart');
      return;
    }

    if (formData.parol.length < 6) {
      setError('Parol kamida 6 belgidan iborat bo\'lishi kerak');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      const result = await onRegister(formData);
      if (!result.success) {
        setError(result.message || 'Ro\'yxatdan o\'tishda xatolik');
      } else {
        onSwitchToLogin();
        alert('Muvaffaqiyatli ro\'yxatdan o\'tdingiz! Iltimos, tizimga kiring.');
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
      <h2>Ro'yxatdan o'tish</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ism</label>
          <input
            name="ism"
            value={formData.ism}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Familiya</label>
          <input
            name="familiya"
            value={formData.familiya}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
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
          <label>Telefon</label>
          <input
            name="telefon"
            type="tel"
            value={formData.telefon}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Parol</label>
          <input
            name="parol"
            type="password"
            value={formData.parol}
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
          {loading ? 'Yuklanmoqda...' : 'Ro\'yxatdan o\'tish'}
        </button>
      </form>
      <p className="switch-auth">
        Hisobingiz bormi?{' '}
        <button 
          type="button" 
          onClick={onSwitchToLogin}
          disabled={loading}
        >
          Kirish
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;