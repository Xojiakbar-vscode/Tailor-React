import React from 'react'
import HomeNav from '../HomeNav/HomeNav'
import About from '../About/About'
import ProductCards from '../ProductCard/ProductCard'
import Delivery from '../Delivery/Delivery'
import Footer from '../Footer/Footer'

const Home = () => {
  return (
    <div>
        <HomeNav />
        <About />
        <ProductCards />
        <Delivery />
        <Footer />
    </div>
  )
}

export default Home