import { useQuery } from '@tanstack/react-query';
import api from '../api.js';

export function useMovies(offset = 0, limit = 50, compact = true) {
  return useQuery({
    queryKey: ['movies', offset, limit, compact],
    queryFn: () => api
      .get('/movies', { params: { offset, limit, compact } })
      .then(r => r.data),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
}

