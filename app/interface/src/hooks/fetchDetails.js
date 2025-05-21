import api from '../api.js';

const PERSON_URL = 'https://image.tmdb.org/t/p/w185';
export async function getMovieDetails(sel) {
  const { data } = await api.get('/details', { params: sel });

  return {
    id: data.movie_id,
    title: data.title,
    overview: data.overview,
    genres: Array.isArray(data.genres) ? data.genres : (data.genres || '').split('|'),
    director: data.director,
    cast: data.cast.map(c => ({
      name:  c.name,
      photo: c.photo
  ? (c.photo.startsWith('http') ? c.photo
                                : `${PERSON_URL}${c.photo}`)
  : '/img/avatar-placeholder.png'
    })),
    poster: sel.poster
  };
}
