import { useQuery }        from '@tanstack/react-query';
import { getMovieDetails } from './fetchDetails';

export function useDetails(selected) {
  const enabled = Boolean(selected?.movie_id);

  return useQuery({
    queryKey: ['details', selected?.movie_id],
    enabled,
    queryFn: () => getMovieDetails(selected),
    staleTime: 60 * 60 * 1000
  })
}