import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './PosterGrid.css'

export default function PosterGrid({ items, onClick, className = '' }) {
  const isGrid = items.length > 5; // threshold para grid

  return (
    <div
      className={[
        'poster-grid',
        isGrid ? 'columns' : '',
        className,
      ].join(' ')}
    >
      {items.map((m) => (
        <div key={m.movie_id} className="poster-item">
          <MovieCard
            title={m.title}
            poster={m.poster}
            onClick={() => onClick?.(m)}
          />
        </div>
      ))}
    </div>
  );
}