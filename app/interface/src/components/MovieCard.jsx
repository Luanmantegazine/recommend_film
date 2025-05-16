import React from "react";

export default function MovieCard({ title, poster, onClick }) {
  return (
    <div
      onClick={onClick}
      className="movie-card flex-shrink-0 w-24 cursor-pointer"
      title={title}
    >
      <img
        src={poster || '/img/placeholder.jpg'}
        alt={title}
        className="
          w-24 h-32 object-cover rounded
          transition-transform duration-300 ease-out
          group-hover:scale-110
        "
      />
    </div>
  );
}

