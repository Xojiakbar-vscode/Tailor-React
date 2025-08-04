import {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from "../ScrollToTop";
import Home from './components/Home/Home';
import SotuvHome from './sotuv/Home/SotuvHome';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
    useEffect(() => {
      AOS.init({
         duration: 1000,
          once: false });
    }, []);
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/yana" element={<SotuvHome/>}/>
      </Routes>
    </Router>
  );
};

export default App; 