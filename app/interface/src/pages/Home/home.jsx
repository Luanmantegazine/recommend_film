import React from 'react'; // useState e useEffect não são mais necessários aqui
import MovieCard from '@/components/MovieCard/MovieCard'; // Mantido caso queira um fallback simples, mas PosterGrid é o principal
import PosterGrid from '@/components/PosterGrid/PosterGrid'; // Usaremos para exibir os filmes
import { useMovies } from '@/hooks/useMovies'; // Hook para buscar filmes
import './home.css'; // Mantendo o CSS, pode conter estilos gerais para a página

export default function Home() {
  // Buscar filmes populares (página 1, ordenado por popularidade)
  const {
    data: movies, // 'data' é o array de filmes retornado pelo useMovies
    isLoading,
    isError,
    error,
  } = useMovies(1, 'popularity.desc', 100); // (page, sortBy, voteCountGte)

  return (
    <div className="home p-4 sm:p-6 w-full max-w-7xl mx-auto"> {/* Ajustado padding para responsividade */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-white"> {/* Título e estilo ajustados */}
        Descubra Novos Filmes
      </h1>

      {isLoading && (
        <p className="mt-10 text-lg text-center text-gray-400">Carregando filmes…</p>
      )}

      {isError && (
        <p className="mt-10 text-lg text-center text-red-500">
          Ocorreu um erro ao buscar os filmes: {error?.message || 'Erro desconhecido'}
        </p>
      )}

      {!isLoading && !isError && movies && movies.length > 0 && (
        // PosterGrid irá renderizar os MovieCards e gerenciar o InfoModal
        <PosterGrid items={movies} />
      )}

      {!isLoading && !isError && (!movies || movies.length === 0) && (
        <p className="mt-10 text-lg text-center text-gray-400">
          Nenhum filme encontrado. Tente novamente mais tarde.
        </p>
      )}
    </div>
  );
}