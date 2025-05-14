import React from "react";

export default function MovieCard({ poster, onClick }) {
  return (
    <div
      onClick={onClick}
      className="movie-card"               /* impede encolher/expandir */
      style={{ width: 96 }}                  /* 96 px = 6rem (w-24) */
    >
      <img
        src={poster}
        style={{ width: 224, height: 256, objectFit: 'cover', borderRadius: 6 }}
      />
      <div
        className="text-center text-[10px] mt-1 truncate"
        style={{ width: 224 }}
      >
      </div>
    </div>
  );
}

