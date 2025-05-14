import api from '../api.js';

export async function fetchDetails(movieId) {
  const { data } = await api.get(`/details/${movieId}`);
  return data;     // { movie_id, title, overview, genres, ... }
}