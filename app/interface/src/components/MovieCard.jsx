import React from "react";

export default function MovieCard ({ title, poster, onClick }) {
  return (
      <div
          className="cursor-pointer rounded overflow-hidden shadow hover:shadow-lg transition-shadow"
          onClick={onClick}
      >
        <img
            src={poster}
            alt={title}
            className="w-full h-32 object-cover"
        />
        <span className="p-2 text-sm text-center">{title}</span>
      </div>
  )
}