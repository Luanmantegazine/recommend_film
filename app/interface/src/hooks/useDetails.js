import { useQuery } from '@tanstack/react-query';
import {getMovieDetails } from "@/hooks/fetchDetails";

export function useDetails(movie_id) {
  return useQuery({
    queryKey: ['details', movie_id],
    enabled: !!movie_id,
    queryFn: () => getMovieDetails(movie_id),
    staleTime: 60 * 60 * 1000
  });
}