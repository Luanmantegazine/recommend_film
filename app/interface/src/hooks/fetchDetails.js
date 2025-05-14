import api from '../api.js';

export async function fetchDetails(movieId) {
  const { data } = await api.get(`/details/${id}`);
  return data;     // { movie_id, title, overview, genres, ... }
}