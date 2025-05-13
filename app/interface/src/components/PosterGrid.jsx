import React from "react";
import MovieCard from "./MovieCard";

const PosterGrid = ({ items, onClick }) => (
  <div className="flex overflow-x-auto space-x-3 pb-4 scrollbar-thin scrollbar-thumb-slate-400">
    {items.map((m) => (
      <MovieCard
        key={m.movie_id || m.title}
        title={m.movie || m.title}
        poster={m.poster}
        onClick={() => onClick?.(m)}
      />
    ))}
  </div>
);

export default PosterGrid;