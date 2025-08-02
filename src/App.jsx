import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import SotuvHome from './sotuv/Home/SotuvHome';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/yana" element={<SotuvHome/>}/>
      </Routes>
    </Router>
  );
};

export default App; 