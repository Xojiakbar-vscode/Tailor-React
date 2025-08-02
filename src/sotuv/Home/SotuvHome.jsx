import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import Swiper from '../Swiper/Swiper';
import Filters from '../Filters/Filters';
import ProductCards from '../ProductCard/ProductCard';
import AdBanner from '../AdBanner/AdBanner';
const SotuvHome = () => {
  return (
    <div>
      <Header/>
      <Swiper/>
      <Filters/>
     <ProductCards/>
     <AdBanner/>
    </div>
  )
}

export default SotuvHome