import { Modal } from "react-bootstrap";
import { FaTimes, FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "./CardHeartModal.css";

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
            <FaHeart className="empty-heart-icon" style={{ fontSize: 60, color: "#ccc" }} />
            <h4 className="mt-3">Sevimlilar ro'yxati bo'sh</h4>
            <p className="text-muted">
              Yoqtirgan mahsulotlaringizni shu yerga saqlashingiz mumkin
            </p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {favorites.map((product) => (
              <div key={product.id} className="col">
                <div className="card h-100 favorite-card" style={{ cursor: "default" }}>
                  <div className="card-img-top-container position-relative">
                    <Swiper
                      modules={[Pagination, Autoplay]}
                      pagination={{ clickable: true }}
                      spaceBetween={10}
                      slidesPerView={1}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      loop={true}
                      style={{ maxHeight: 180 }}
                    >
                      {/* main_image va extra_images bilan slayder */}
                      {product.extra_images && product.extra_images.length > 0 ? (
                        <>
                          <SwiperSlide>
                            <img
                              src={product.main_image || "/placeholder.png"}
                              alt={product.name}
                              style={{ width: "100%", objectFit: "contain", maxHeight: 180 }}
                              onError={(e) => (e.target.src = "/placeholder.png")}
                            />
                          </SwiperSlide>
                          {product.extra_images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                              <img
                                src={img}
                                alt={`${product.name} qo‘shimcha rasm ${idx + 1}`}
                                style={{ width: "100%", objectFit: "contain", maxHeight: 180 }}
                                onError={(e) => (e.target.src = "/placeholder.png")}
                              />
                            </SwiperSlide>
                          ))}
                        </>
                      ) : (
                        <SwiperSlide>
                          <img
                            src={product.main_image || "/placeholder.png"}
                            alt={product.name}
                            style={{ width: "100%", objectFit: "contain", maxHeight: 180 }}
                            onError={(e) => (e.target.src = "/placeholder.png")}
                          />
                        </SwiperSlide>
                      )}
                    </Swiper>
                    <button
                      className="remove-favorite-btn position-absolute top-0 end-0 btn btn-sm btn-danger"
                      style={{ borderRadius: "0 0 0.25rem 0", zIndex: 10 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product.id, true);
                      }}
                      aria-label="Sevimlidan olib tashlash"
                      title="Sevimlidan olib tashlash"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontWeight: "600" }}>
                      {product.name}
                    </h5>
                    <p className="card-text text-primary fw-bold" style={{ fontSize: "1.1rem" }}>
                      {product.price
                        ? parseFloat(product.price).toLocaleString("ru-RU") + " so'm"
                        : "Narx mavjud emas"}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-top-0">
                    <button className="btn btn-outline-primary w-100">Savatga qo'shish</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="border-top-0">
        <button className="btn btn-primary px-4 py-2" onClick={onHide}>
          Yopish
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardHeartModal;
