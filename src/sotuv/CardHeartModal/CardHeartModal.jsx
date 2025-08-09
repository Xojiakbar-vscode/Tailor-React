import { Modal } from 'react-bootstrap';
import { FaTimes, FaHeart } from 'react-icons/fa';
import './CardHeartModal.css';

const CardHeartModal = ({ show, onHide, favorites, onToggleFavorite }) => {
  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      fullscreen 
      centered 
      backdrop="static" 
      className="favorites-modal"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title className="w-100 text-center">
          <h3>Sevimli Mahsulotlar</h3>
          <p className="text-muted mb-0">{favorites.length} ta mahsulot</p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {favorites.length === 0 ? (
          <div className="text-center py-5">
            <FaHeart className="empty-heart-icon" />
            <h4 className="mt-3">Sevimlilar ro'yxati bo'sh</h4>
            <p className="text-muted">Yoqtirgan mahsulotlaringizni shu yerga saqlashingiz mumkin</p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {favorites.map(product => (
              <div key={product.id} className="col">
                <div className="card h-100 favorite-card">
                  <div className="card-img-top-container">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="card-img-top"
                    />
                    <button 
                      className="remove-favorite-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product.id, true);
                      }}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-primary fw-bold">
                      {product.price.toLocaleString()} so'm
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-top-0">
                    <button className="btn btn-outline-primary w-100">
                      Savatga qo'shish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="border-top-0">
        <button 
          className="btn btn-primary px-4 py-2"
          onClick={onHide}
        >
          Yopish
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardHeartModal;