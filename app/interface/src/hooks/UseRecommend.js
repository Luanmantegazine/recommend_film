import { useQuery } from '@tanstack/react-query';
import api from '../api.js';

export function useRecommend({ title, titleId, topK = 25 }) {
  return useQuery({
    queryKey: ['recommend', title ?? titleId, topK],
    queryFn: () => api
      .get('/recommend', { params: { title, title_id: titleId, top_k: topK } })
      .then(r => r.data),
    enabled: Boolean(title || titleId),
    staleTime: 1000 * 60 * 10,
  });
}

