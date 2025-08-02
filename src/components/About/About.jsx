import React from "react";
import aboutImg1 from "../../assets/ip.png";
import aboutImg2 from "../../assets/qaychi.png";
import aboutImg3 from "../../assets/metr.png";
import "./About.css";

const About = () => {
  return (
  <section className="about">
      <div className="about-heading" id="aboutSection">
        <h3 data-aos="fade-right">
          Bizning do'konimizda siz profesional va havaskor tikuvchilar uchun kerak 
          bo'ladigan barcha mahsulotlarni topasiz:
        </h3>
      </div>
      
      <div className="about-main" id="aboutSection1" data-aos="fade-right">
        <ul>
          <li>Turli rangdagi va turdagi iplar</li>
          <li>Tugmalar, fermuarlar, aksessuarlar</li>
          <li>Hamda boshqa ko'plab tikuvchilik jihozlari</li>
        </ul>
        <img 
          src={aboutImg1} 
          alt="Tikuvchilik mahsulotlari" 
          className="about-main-img"
        />
      </div>
      
      <div className="about-footer" data-aos="fade-right" id="aboutSection2">
        <img 
          src={aboutImg2} 
          alt="Tikuvchilik aksessuarlari" 
          className="about-footer-img desktop-only"
        />
        <img 
          src={aboutImg3} 
          alt="Tikuvchilik jihozlari" 
          className="about-footer-img desktop-only"
        />
      </div>
    </section>
  );
};

export default About;