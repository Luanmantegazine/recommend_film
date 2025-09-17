// src/pages/ReleaseMoviesPage.jsx
import { useEffect, useMemo } from 'react';
import PosterGrid from '@/components/PosterGrid/PosterGrid';
import { useInfiniteMovies } from '@/hooks/useMovies';
import { useInView } from 'react-intersection-observer';
import './ReleaseMoviesPage.css';

export default function ReleaseMoviesPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteMovies('primary_release_date.desc', 50);

  const movies = useMemo(() => {
    if (!data?.pages) {
      return [];
    }

    return data.pages
      .flatMap((page) => (Array.isArray(page?.results) ? page.results : []))
      .filter(Boolean);
  }, [data]);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="page-container p-4 sm:p-6 w-full max-w-7xl mx-auto">
      {/* ... (H1, isLoading, isError, etc. como antes) ... */}
      <h1 className="page-title text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-white">
        Filmes Lançamento
      </h1>

      {isLoading && (
        <p className="status-message mt-10 text-lg text-center">Carregando lançamentos…</p>
      )}

      {isError && (
        <p className="status-message error mt-10 text-lg text-center">
          Ocorreu um erro ao buscar os filmes: {error?.message || 'Erro desconhecido'}
        </p>
      )}

      {!isLoading && !isError && movies.length > 0 && (
        <PosterGrid items={movies} />
      )}

      <div className="load-more-trigger" ref={ref}>
        {isFetchingNextPage && (
          <p className="status-message mt-8 text-center">Carregando mais filmes…</p>
        )}
        {!isFetchingNextPage && !hasNextPage && movies.length > 0 && (
          <p className="status-message mt-8 text-center">Você chegou ao fim da lista!</p>
        )}
      </div>

      {!isLoading && !isError && movies.length === 0 && (
        <p className="status-message mt-10 text-lg text-center">
          Nenhum lançamento encontrado no momento.
        </p>
      )}
    </div>
  );
}