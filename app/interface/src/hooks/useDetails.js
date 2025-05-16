import { useQuery } from '@tanstack/react-query';
import api from '../api.js'

export function useDetails(movie_id) {
  return useQuery({
    queryKey: ['details', movie_id],
    enabled: Boolean(movie_id),
    queryFn: async () => {
      const { data } = await api.get(`/details/${movie_id}`);
      return data;
    },
    staleTime: 1000 * 60 * 60,
  });
}