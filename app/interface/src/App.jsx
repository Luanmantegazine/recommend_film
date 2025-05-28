import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import ReleaseMoviesPage from './pages/ReleaseMoviesPage/ReleaseMoviePage';
import RecommendationFinderPage from './pages/RecommendationFinderPage/RecommendationFinderPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="app-nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Lançamentos
          </NavLink>
          <NavLink
            to="/me-recomende"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Me Recomende
          </NavLink>
        </nav>

        <main className="app-main-content">
          <Routes>
            <Route path="/" element={<ReleaseMoviesPage />} />
            <Route path="/me-recomende" element={<RecommendationFinderPage />} />
            {/* Você pode adicionar um redirect para a rota padrão se quiser */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

