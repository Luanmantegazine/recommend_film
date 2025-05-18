import React, { useState }   from 'react';
import { useMovies }         from '@/hooks/useMovies';
import { useRecommend }      from '@/hooks/useRecommend';
import { useDetails }        from '@/hooks/useDetails';
import InfoModal             from '@/components/InfoModal/InfoModal';
import Select                from 'react-select';
import './home.css';

export default function Home() {
  const [title, setTitle]         = useState('');
  const [qtd, setQtd]             = useState(5);
  const [selected, setSelected]   = useState(null); // { movie_id, title, poster }
  const [modalOpen, setModalOpen] = useState(false);

  /* dados remotos */
  const { data: options = [] } = useMovies(0, 100, true);
  const { data: recs, isFetching, refetch, isFetched }
        = useRecommend(title, qtd);
  const { data: details, isLoading: loadingDetails }
        = useDetails(selected);

  /* junta pôster/título (clique) + detalhes (fetch) */
  const movie = selected ? { ...selected, ...details } : null;

  /* handlers */
  const handleRecommend = () => title && refetch();

  const handlePosterClick = (m) => {
    setSelected({
      movie_id: m.movie_id,
      title:    m.title,
      poster:   m.poster
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelected(null);
  };

  /* UI */
  return (
    <div className="home-container">
      <h1 className="home-title">Movie Recommender</h1>

      {/* seletor + quantidade + botão */}
      <div className="selection-container">
        <Select
          options={options.map(o => ({ value: o.movie, label: o.movie }))}
          onChange={opt => setTitle(opt?.value || '')}
          placeholder="Choose a movie…"
          className="react-select-container mb-4"
          classNamePrefix="rs"
          isSearchable
        />

        <div className="flex gap-3 mb-4 text-slate-300">
          {[5,10,15,20,25,30,35,40].map(n => (
            <label key={n} className="inline-flex items-center gap-1 cursor-pointer">
              <input
                type="radio" name="qtd" value={n}
                checked={qtd === n}
                onChange={() => setQtd(n)}
                className="accent-sky-600"
              />
              {n}
            </label>
          ))}
        </div>

        <button
          onClick={handleRecommend}
          disabled={!title || isFetching}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2
                     rounded-md bg-sky-600 hover:bg-sky-700 disabled:bg-sky-300
                     text-white transition-colors mb-8"
        >
          {isFetching ? 'Loading…' : 'Recommend'}
        </button>
      </div>

      {/* grid de pôsteres */}
      {isFetched && recs?.length > 0 && (
        <div className="movie-grid">
          {recs.map((m) => (
            <div key={m.movie_id} className="movie-card"
                 onClick={() => handlePosterClick(m)}>
              <img src={m.poster || '/img/placeholder.jpg'} alt={m.title} />
            </div>
          ))}
        </div>
      )}

      {/* modal */}
      <InfoModal
        isOpen={modalOpen}
        onClose={closeModal}
        movie={movie}
        loading={loadingDetails}
      />

      <footer className="footer">
        © {new Date().getFullYear()} Movie Recommender
      </footer>
    </div>
  );
}
