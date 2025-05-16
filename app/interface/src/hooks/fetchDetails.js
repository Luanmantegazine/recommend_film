import api from '../api.js';

export async function fetchDetails(movieId) {
  const { data } = await api.get(`/details/${movieId}`, { params:query });
    return {
    ...data,
    poster: `https://image.tmdb.org/t/p/w500/${data.poster_path || ''}`,
  };
};