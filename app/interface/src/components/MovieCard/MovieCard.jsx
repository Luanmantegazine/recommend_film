import React from 'react';
import PropTypes from 'prop-types';

import './MovieCard.css';

export default function MovieCard({ title, poster, onClick }) {
  const placeholder = '/img/placeholder.jpg';

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


