import PropTypes from 'prop-types'
import './InfoModal.css'
export default function InfoModal({ isOpen, onClose, movie, loading }) {
  if (!isOpen) return null;

  const {
    title    = 'Carregando…',
    overview = '',
    genres   = [],
    director = '',
    cast     = [],
    poster
  } = movie || {};

   return (
    <div
      className="info-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
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
          alt={title === 'Carregando…' ? 'Carregando poster' : `Poster de ${title}`}
          className="info-modal__poster"
        />

        <div className="info-modal__content">
          <h2 className="info-modal__title" id="info-modal-title">{title}</h2>

          {loading ? (
            <p>Carregando detalhes…</p>
          ) : !movie ? (
            <p>Não foi possível carregar os detalhes do filme.</p>
          ) : (
            <>
              <p className="info-modal__overview">{overview}</p>

              <div className="info-modal__meta">
                <p><strong>Gênero:</strong> {Array.isArray(genres) ? genres.join(', ') : ''}</p>
                <p><strong>Diretor:</strong> {director}</p>
              </div>

              {Array.isArray(cast) && cast.length > 0 && (
                <>
                  <h3 className="info-modal__subtitle">Elenco</h3>
                  <ul className="cast-list">
                    {cast.slice(0, 8).map((p) => (
                      <li key={p.id || p.name} className="cast-item">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

 InfoModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   movie: PropTypes.shape({
     title: PropTypes.string,
     overview: PropTypes.string,
     genres: PropTypes.arrayOf(PropTypes.string),
     director: PropTypes.string,
     cast: PropTypes.arrayOf(PropTypes.shape({
       id: PropTypes.any, // ou PropTypes.number / PropTypes.string
       name: PropTypes.string,
       photo: PropTypes.string,
     })),
     poster: PropTypes.string,
   }),
   loading: PropTypes.bool,
 };