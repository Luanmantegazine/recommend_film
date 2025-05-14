import React from "react";
import {useNavigate} from "react-router-dom";
import MovieCard from "./MovieCard";

export default function PosterGrid({ items, onClick, className = '' }) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-nowrap gap-4 overflow-x-auto px-4 ${className}`}
      style={{ scrollSnapType: 'x mandatory' }}
    >
      {items.map((m) => (
        <MovieCard
          key={m.title_id}
          title={m.title}
          poster={m.poster}
          onClick={() => navigate(`/`)}
        />
      ))}
    </div>
  );
}
