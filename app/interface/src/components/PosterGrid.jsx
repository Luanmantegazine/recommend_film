import React from "react";
import MovieCard from "./MovieCard";

const PosterGrid = ({ items, onClick }) => (
  <div className="flex space-x-4 overflow-x-auto py-4">
    {items.map((m) => (
      <div key={m.title_id || m.title} className="flex-shrink-0 w-24">
        <MovieCard
          title={m.movie || m.title}
          poster={m.poster}
          onClick={() => onClick?.(m)}
        />
      </div>
    ))}
  </div>
);

export default PosterGrid;