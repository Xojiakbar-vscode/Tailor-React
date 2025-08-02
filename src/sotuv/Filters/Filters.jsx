import React from "react";
import "./Filters.css";

import img1 from "../../assets/1-removebg-preview (2).png";
import img2 from "../../assets/3-removebg-preview (2).png";
import img3 from "../../assets/4-removebg-preview (1).png";
import img4 from "../../assets/5-removebg-preview (1).png";
import img5 from "../../assets/2-removebg-preview (2).png";

const Filters = () => {
  return (
    <section className="filters" data-aos="fade-up">
      <button className="filter-btn">
        <img src={img1} alt="Ninalar" />
        Ninalar
      </button>
      <button className="filter-btn">
        <img src={img2} alt="Tikuv iplari" />
        Tikuv iplari
      </button>
      <button className="filter-btn">
        <img src={img3} alt="Mahsus tikuv iplari" />
        Mahsus tikuv iplari
      </button>
      <button className="filter-btn">
        <img src={img4} alt="Tugmalar" />
        Tugmalar
      </button>
      <button className="filter-btn">
        <img src={img5} alt="Rezinka" />
        Rezinka
      </button>
    </section>
  );
};

export default Filters;
