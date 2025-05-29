// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import HomePage from './pages/Home/home';
import ReleaseMoviesPage from './pages/ReleaseMoviesPage/ReleaseMoviePage';
import TVSeriesReleasePage from './pages/TVSeriesRealeasePage/TVSeriesRealeasePage'
import RecommendationFinderPage from './pages/RecommendationFinderPage/RecommendationFinderPage';
import './App.css';

const AppTitle = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/');
  return (
    <div className="app-title-container" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h1 className="app-title">Movie Recommender</h1>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <AppTitle />
          <nav className="app-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
              Home
            </NavLink>
            <NavLink to="/lancamentos/filmes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Filmes {/* Mudado o nome para clareza */}
            </NavLink>
            <NavLink to="/lancamentos/series" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> {/* <<< NOVA ABA */}
              Séries
            </NavLink>
            <NavLink to="/me-recomende" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Me Recomende
            </NavLink>
          </nav>
        </header>

        <main className="app-main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lancamentos/filmes" element={<ReleaseMoviesPage />} />
            <Route path="/lancamentos/series" element={<TVSeriesReleasePage />} />
            <Route path="/me-recomende" element={<RecommendationFinderPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}