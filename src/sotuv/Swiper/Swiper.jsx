import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./Swiper.css"
// Rasmlar
import img from "../../images/slayder1.jpg";
import img1 from "../../images/slayder2.jpg";
import img2 from "../../images/slayder3.jpg";

// Swiper style
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider() {
  return (
    <div style={{ width: "90%", margin: "0 auto" }} data-aos="fade-down">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1} // 🔹 Faqat bitta slayd
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        style={{ padding: "30px 0" }}
      >
        <SwiperSlide>
          <img
            src={img}
            alt=""
            style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "8px" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img1}
            alt=""
            style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "8px" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img2}
            alt=""
            style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "8px" }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

