// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail'; 
import HomePage from './pages/HomePage';
import Category from './pages/Category';
import PhimBo from './pages/PhimBo';
import PhimLe from './pages/PhimLe';
import AllCategory from './pages/AllCetegory';
import PhimMoiNhat from './pages/PhimMoiNhat';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/moviedetail/:id" element={<MovieDetail />} />
        <Route path="/the-loai/:slug" element={<Category />} />
        <Route path="/movie/:slug" element={<MovieDetail />} />
        <Route path="/phim-bo" element={<PhimBo />} />
        <Route path="/phim-le" element={<PhimLe />} />
        <Route path="/phim-moi-nhat" element={<PhimMoiNhat />} />
        <Route path="/the-loai" element={<AllCategory />} />





        
      </Routes>
    </Router>
  );
}

export default App;
