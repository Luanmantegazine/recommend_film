import './InfoModal.css'
export default function InfoModal({ isOpen, onClose, movie, loading }) {
  if (!isOpen || !movie) return null;

  const {
    title    = 'Carregando…',
    overview = '',
    genres   = [],
    director = '',
    cast     = [],
    poster
  } = movie;

  return (
    <div
      className="info-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="info-modal"
        onClick={e => e.stopPropagation()}
      >
        <button className="info-modal__close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <img
          src={poster || '/img/placeholder.jpg'}
          alt={title}
          className="info-modal__poster"
        />

        <div className="info-modal__content">
          <h2 className="info-modal__title">{title}</h2>
          {loading ? (
            <p>Carregando detalhes…</p>
          ) : (
            <>
              <p className="info-modal__overview">{overview}</p>

              <div className="info-modal__meta">
                <p><strong>Genre:</strong> {genres.join(', ')}</p>
                <p><strong>Director:</strong> {director}</p>
              </div>

              <h3 className="info-modal__subtitle">Cast</h3>
              <ul className="cast-list">
                {cast.slice(0, 8).map((p, i) => (
                  <li key={i} className="cast-item">
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="cast-photo"
                      loading="lazy"
                    />
                    <span className="cast-name">{p.name}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
