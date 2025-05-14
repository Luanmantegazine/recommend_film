import React from "react";
import MovieCard from "./MovieCard";

export default function PosterGrid({ items, onClick, className = '' }) {
  return (
    <div
      className={`flex flex-nowrap gap-4 overflow-x-auto px-4 ${className}`}
      style={{ scrollSnapType: 'x mandatory' }}
    >
      {items.map((m) => (
        <MovieCard
          key={m.title}
          title={m.title}
          poster={m.poster}
          onClick={() => onClick?.(m)}
        />
      ))}
    </div>
  );
}
