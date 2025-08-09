import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import Swiper from '../Swiper/Swiper';
import Filters from '../Filters/Filters';
import ProductCards from '../ProductCard/ProductCard';
import AdBanner from '../AdBanner/AdBanner';
import FooterNavbar from '../FooterNavbar/FooterNavbar';
import MyComponent from '../../components/Mycomponent/MyComponent';
const SotuvHome = () => {
  return (
    <div>
      <Header/>
      <Swiper/>
      <Filters/>
     <ProductCards/>
     <MyComponent/>
     <AdBanner/>
     <FooterNavbar/>
    </div>
  )
}

export default SotuvHome