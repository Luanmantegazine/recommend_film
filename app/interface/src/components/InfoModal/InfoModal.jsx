import './InfoModal.css'
export default function InfoModal({ isOpen, onClose, movie }) {
  if (!isOpen) return null;          // render condicional :contentReference[oaicite:7]{index=7}

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="info-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="info-modal"
        onClick={e => e.stopPropagation()}     // impede propagation :contentReference[oaicite:8]{index=8}
      >
        <button
          onClick={onClose}
          className="info-modal__close"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        <img
          src={movie.poster ?? '/img/placeholder.jpg'}
          alt={movie.title}
          className="info-modal__poster"
          onError={e => { e.currentTarget.src = '/img/placeholder.jpg'; }}
        />

        <div className="info-modal__content">
          <h2 className="info-modal__title">{movie.title}</h2>
          <p className="info-modal__overview">{movie.overview}</p>

          <div className="info-modal__meta">
            <p><strong>Gêneros:</strong> {movie.genres.join(', ')}</p>
            <p><strong>Diretor:</strong> {movie.director}</p>
            <p><strong>Elenco:</strong> {movie.cast.slice(0, 5).join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
