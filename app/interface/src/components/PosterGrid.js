import React from "react";
import MovieCard from "./MovieCard";

const PosterGrid = ({ items, onClick }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {items.map((m) => (
      <MovieCard
        key={m.movieId || m.title}
        title={m.movie || m.title}
        poster={m.poster}
        onClick={() => onClick?.(m)}
      />
    ))}
  </div>
);

export default PosterGrid;