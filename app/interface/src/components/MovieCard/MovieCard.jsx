import React from 'react';
import PropTypes from 'prop-types';

import './MovieCard.css';     //  ← estilos “sala de cinema”

/**
 * Pôster compacto usado no PosterGrid.
 *
 * Props
 * -----
 * title   : string   • Título do filme (apenas para alt / acessibilidade)
 * poster  : string   • URL da imagem (pode ser null → placeholder)
 * onClick : func     • Callback disparado ao clicar / pressionar Enter
 */
export default function MovieCard({ title, poster, onClick }) {
  const placeholder = '/img/placeholder.jpg';

  // Permite navegação por teclado (Enter / Space)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className="movie-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      title={title}
    >
      <img
        src={poster || placeholder}
        alt={`Poster of ${title}`}
        loading="lazy"
        draggable="false"
      />
      {/*
        • Se no futuro quiser texto sobre o gradiente:
        <span className="movie-title">{title}</span>
      */}
    </div>
  );
}

MovieCard.propTypes = {
  title:    PropTypes.string.isRequired,
  poster:   PropTypes.string,
  onClick:  PropTypes.func,
};


