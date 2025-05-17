import api from '../api.js';

export async function getMovieDetails(movie_id) {
  const { data } = await api.get(`/details/${movie_id}`);

  return {
    id: data.movie_id,
    title: data.title,
    overview: data.overview,
    genres: Array.isArray(data.genres) ? data.genres : (data.genres || '').split('|'),
    director: data.director ?? 'Desconhecido',
    cast: data.cast ?? [],
  };
}