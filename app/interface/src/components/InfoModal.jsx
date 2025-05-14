import React from 'react';

export default function InfoModal({ isOpen, onClose, movie }) {
  if (!isOpen || !movie) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg overflow-hidden max-w-md w-full relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✕
        </button>
        <img
          src={movie.poster || '/img/placeholder.jpg'}
          alt={movie.title}
          className="w-full h-56 object-cover"
        />
        <div className="p-4 text-left">
          <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
          <p className="text-sm mb-3">{movie.overview}</p>
          <p className="text-xs text-gray-700 mb-1">
            <strong>Gêneros:</strong> {movie.genres.join(', ')}
          </p>
          <p className="text-xs text-gray-700 mb-1">
            <strong>Diretor:</strong> {movie.director}
          </p>
          <p className="text-xs text-gray-700">
            <strong>Elenco:</strong> {movie.cast.slice(0,5).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}