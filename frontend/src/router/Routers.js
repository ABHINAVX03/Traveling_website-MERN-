import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import ThankYou from '../pages/ThankYou';
import About from '../pages/About'
const Routers = ({color,mode}) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home color={color}/>} />
      <Route path="/tour" element={<Tours color={color}/>} />
      <Route path="/tours/:id" element={<TourDetails color={color} mode={mode}/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou color={color}/>} />
      <Route path="/about" element={<About color={color}/>} />
      

      <Route path="/tours/search" element={<SearchResultList color={color}/>} />
    </Routes>
  );
};

export default Routers;
