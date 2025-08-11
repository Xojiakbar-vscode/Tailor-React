import React from 'react'
import HomeNav from '../HomeNav/HomeNav'
import About from '../About/About'
import Delivery from '../Delivery/Delivery'
import Footer from '../Footer/Footer'
import ProductCards from '../ProductCard/ProductCard'


const Home = () => {
  return (
    <div>
        <HomeNav />
        <About />
        <ProductCards/>
        <Delivery />
        <Footer />
    </div>
  )
}

export default Home