// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  // Foydalanuvchi auth holatini tekshirish
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost/tailorshop/Backend/api/check_auth.php', {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Kirish funktsiyasi
const login = async ({ email, password }) => {
  try {
    const response = await fetch('http://localhost/tailorshop/Backend/api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: email.trim(), 
        parol: password 
      }),
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { 
        success: false, 
        message: data.message || 'Email yoki parol noto\'g\'ri' 
      };
    }
    
    setUser(data.user);
    return { success: true, user: data.user };
    
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      message: 'Tarmoq xatosi. Iltimos, internet aloqasini tekshiring' 
    };
  }
};

const register = async (userData) => {
  try {
    const response = await fetch('http://localhost/tailorshop/Backend/api/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { 
        success: false, 
        message: data.message || 'Ro\'yxatdan o\'tish muvaffaqiyatsiz tugadi' 
      };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Registration error:', error);
    return { 
      success: false, 
      message: 'Tarmoq xatosi. Iltimos, internet aloqasini tekshiring' 
    };
  }
};

  // Chiqish funktsiyasi
  const logout = async () => {
    try {
      await fetch('http://localhost/tailorshop/Backend/api/logout.php', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Chiqishda xatolik' };
    }
  };
    const updateProfile = (updatedUser) => {
    setUser(updatedUser);
    return { success: true };
  };

  return { user, loading, login, logout, register, updateProfile };
}