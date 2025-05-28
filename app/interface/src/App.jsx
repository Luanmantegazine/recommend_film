// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'; // Adicionado useNavigate
import HomePage from './pages/Home/home'; // Nova página Home
import ReleaseMoviesPage from './pages/ReleaseMoviesPage/ReleaseMoviePage';
import RecommendationFinderPage from './pages/RecommendationFinderPage/RecommendationFinderPage';
import './App.css';

// Componente interno para o título clicável, se não quiser usar o hook useNavigateHome
const AppTitle = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/'); // Navega para a rota raiz (HomePage)
  };
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
          <AppTitle /> {/* Título do app agora é clicável */}
          <nav className="app-nav">
            <NavLink
              to="/" // Link para a nova HomePage
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end // Adiciona 'end' para que não fique ativo para sub-rotas como /lancamentos
            >
              Home
            </NavLink>
            <NavLink
              to="/lancamentos" // Novo caminho para Lançamentos
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
        </header>

        <main className="app-main-content">
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Rota raiz agora é HomePage */}
            <Route path="/lancamentos" element={<ReleaseMoviesPage />} /> {/* Nova rota para Lançamentos */}
            <Route path="/me-recomende" element={<RecommendationFinderPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}