import React from 'react';

export default function InfoModal({ isOpen, onClose, movie }) {
  if (!isOpen || !movie) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 text-white rounded-lg p-4 max-w-lg w-full grid gap-4 md:grid-cols-[150px_1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={movie.poster || '/img/placeholder.jpg'}
          alt={movie.title}
          className="w-full h-[220px] object-cover rounded"
        />
        <div>
          <h2 className="font-bold text-xl text-red-600 mb-2">{movie.title}</h2>
          <p className="text-sm text-gray-300 mb-2">{movie.overview}</p>
          <p className="text-xs text-gray-400 mb-1">
            <strong>Gêneros:</strong> {movie.genres.join(', ')}
          </p>
          <p className="text-xs text-gray-400 mb-1">
            <strong>Diretor:</strong> {movie.director}
          </p>
          <p className="text-xs text-gray-400">
            <strong>Elenco:</strong> {movie.cast.slice(0, 4).join(', ')}
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}