import React from "react";

export default function MovieCard({ title, poster, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer w-28 sm:w-32 md:w-36 lg:w-40 flex-shrink-0"
    >
      <div className="aspect-[2/3] overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl">
        <img
          src={poster || '/placeholder.webp'}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-2 text-xs sm:text-sm line-clamp-2 text-center">
        {title}
      </p>
    </div>
  );
}
