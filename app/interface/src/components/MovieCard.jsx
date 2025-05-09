import React from "react";

const MovieCard = ({ title, poster, onClick }) => (
  <div
    className="cursor-pointer flex flex-col items-center gap-2"
    onClick={onClick}
  >
    <img
      src={poster || "/img/placeholder.jpg"}
      alt={title}
      className="w-full aspect-[2/3] object-cover rounded-2xl shadow-md"
      loading="lazy"
    />
    <span className="text-sm text-center line-clamp-2">{title}</span>
  </div>
);

export default MovieCard;