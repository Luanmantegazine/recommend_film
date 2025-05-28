import React from 'react';
import PropTypes from 'prop-types';
import './MovieCard.css';

export default function MovieCard({ title, poster, onClick, movieId }) {
  const placeholder = '/img/placeholder.jpg';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(movieId);
    }
  };

  return (
    <div
      className="movie-card"
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(movieId)}
      onKeyDown={handleKeyDown}
      aria-label={`Ver detalhes de ${title}`}
      title={title}
    >
      <img
        src={poster || placeholder}
        alt={`Poster de ${title}`}
        loading="lazy"
        draggable="false"
      />
    </div>
  );
}

MovieCard.propTypes = {
  movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Adicionado propType para movieId
  title:   PropTypes.string.isRequired,
  poster:  PropTypes.string,
  onClick: PropTypes.func,
};