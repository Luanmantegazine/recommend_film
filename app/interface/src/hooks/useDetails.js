import { useQuery } from '@tanstack/react-query';
import { fetchDetails } from '@/hooks/fetchDetails';

export function useDetails(movieId) {
  return useQuery(['details', movieId], () => fetchDetails(movieId), {
    enabled: Boolean(movieId),
    staleTime: 1000*60*5,
  });
}