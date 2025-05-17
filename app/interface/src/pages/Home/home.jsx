import React, { useState } from 'react';
import { useMovies }      from '@/hooks/useMovies';
import { useRecommend }   from '@/hooks/useRecommend';
import { useDetails }     from '@/hooks/useDetails';
import InfoModal          from '@/components/InfoModal/InfoModal';
import Select             from 'react-select';
import './home.css';

export default function Home() {
  /* ---- estado de controle ---- */
  const [title,         setTitle]         = useState('');
  const [qtd,           setQtd]           = useState(5);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen,     setModalOpen]     = useState(false);

  const { data: options = [] } = useMovies(0, 100, true);
  const { data: recs, isFetching, refetch, isFetched }
        = useRecommend(title, qtd);
    const { data: movieDetails, isLoading: loadingDetails }
        = useDetails(selectedMovie?.id);   // hook só roda com id
   const mergedMovie = selectedMovie? { ...selectedMovie, ...movieDetails } : null;

  /* ---- handlers ---- */
  const handleRecommend  = () => title && refetch();
  const handlePosterClick = (movie) => {
    setSelectedMovie({
        id: movie.movie_id,
        title: movie.title,
        poster: movie.poster
    });
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Movie Recommender</h1>

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
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md
                     bg-sky-600 hover:bg-sky-700 disabled:bg-sky-300 text-white transition-colors mb-8"
        >
          {isFetching ? 'Loading…' : 'Recommend'}
        </button>
      </div>

      {isFetched && recs?.length > 0 && (
        <div className="movie-grid">
          {recs.map(movie => (
            <div key={movie.movie_id} className="movie-card"
                 onClick={() => handlePosterClick(movie)}>
              <img src={movie.poster || '/img/placeholder.jpg'} alt={movie.title}/>
            </div>
          ))}
        </div>
      )}

      <InfoModal
        isOpen={modalOpen}
        onClose={closeModal}
        movie={mergedMovie}
      />

      <footer className="footer">
        © {new Date().getFullYear()} Movie Recommender
      </footer>
    </div>
  );
}
