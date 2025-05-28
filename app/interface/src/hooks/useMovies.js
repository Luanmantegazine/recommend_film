import { useQuery } from '@tanstack/react-query';
import api from '../api.js';

export function useMovies(
  page = 1,
  sortBy = 'popularity.desc',
  voteCountGte = 100
) {
  return useQuery({
    queryKey: ['movies', page, sortBy, voteCountGte],
    queryFn: () => api
      .get('/movies', {
        params: {
          page,
          sort_by:       sortBy,
          vote_count_gte: voteCountGte
        }
      })
      .then(r => r.data),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
}


