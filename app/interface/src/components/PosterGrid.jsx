import React from "react";
import MovieCard from "./MovieCard";

/**
 * Galeria horizontal rolável de pôsteres.
 *
 * @param {Array}  items   [{title,poster, …}]
 * @param {Func}   onClick callback(item)
 * @param {String} className extra Tailwind classes
 */
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
