// src/pages/ReleaseMoviesPage.jsx
import React from 'react';
import PosterGrid from '@/components/PosterGrid/PosterGrid'; // Ajuste o caminho se necessário
import { useMovies } from '@/hooks/useMovies'; // Ajuste o caminho se necessário
import './ReleaseMoviesPage.css'; // CSS específico para esta página

export default function ReleaseMoviesPage() {
  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useMovies(
    1, // Página 1
    'primary_release_date.desc', // Ordenar por data de lançamento
    50 // Mínimo de 50 votos
  );

  return (
    <div className="page-container p-4 sm:p-6 w-full max-w-7xl mx-auto">
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

      {!isLoading && !isError && movies && movies.length > 0 && (
        <PosterGrid items={movies} />
      )}

      {!isLoading && !isError && (!movies || movies.length === 0) && (
        <p className="status-message mt-10 text-lg text-center">
          Nenhum lançamento encontrado no momento.
        </p>
      )}
    </div>
  );
}