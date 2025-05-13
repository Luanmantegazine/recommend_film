import { useQuery } from '@tanstack/react-query'
import api from '../api.js'

export function useRecommend({title, topK = 5 } = {}) {
  return useQuery({
    queryKey: ['recommend',title, topK],
    queryFn: async ({ queryKey }) => {
      const { data } = await api.get('/recommend', {
        params: {title, top_k: topK }
      });
      return data;
    },
    enabled: false,
    staleTime: 1000 * 60 * 10,
  });
}