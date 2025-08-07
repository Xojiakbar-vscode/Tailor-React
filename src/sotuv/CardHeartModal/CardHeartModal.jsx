import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHeart, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './CardHeartModal.css';

const CardHeartModal = ({ show, onHide, userId }) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (show && userId) {
      fetchFavoriteProducts();
    }
  }, [show, userId]);

  const fetchFavoriteProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost/tailorshop/Backend/api/favorites.php?user_id=${userId}`);
      setFavoriteProducts(response.data.data || []);
    } catch (error) {
      console.error('Sevimli mahsulotlarni yuklashda xato:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (productId) => {
    try {
      await axios.delete(`http://localhost/tailorshop/Backend/api/favorites.php`, {
        data: { user_id: userId, product_id: productId }
      });
      setFavoriteProducts(favoriteProducts.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Sevimlidan o\'chirishda xato:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="card-heart-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          <FaHeart className="heart-icon" /> Sevimli Mahsulotlar
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">Yuklanmoqda...</div>
        ) : favoriteProducts.length === 0 ? (
          <div className="empty-favorites">
            <p>Hozircha sevimli mahsulotlar mavjud emas</p>
          </div>
        ) : (
          <div className="favorite-products-grid">
            {favoriteProducts.map(product => (
              <div key={product.id} className="favorite-product-card">
                <img 
                  src={`http://localhost/tailorshop/Backend/${product.image}`} 
                  alt={product.name} 
                  className="product-image"
                  onError={(e) => e.target.src = '/placeholder-product.jpg'}
                />
                <div className="product-info">
                  <h5>{product.name}</h5>
                  <p className="price">{product.price} so'm</p>
                </div>
                <button 
                  className="remove-favorite-btn"
                  onClick={() => removeFavorite(product.id)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CardHeartModal;