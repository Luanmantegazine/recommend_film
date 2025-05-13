import { useQuery } from '@tanstack/react-query'
import { fetchRecommend} from "@/hooks/fetchRecommend.js";

export function useRecommend(title, topK = 5) {
  return useQuery({
    queryKey: ['recommend', title, topK],
    queryFn: () => fetchRecommend({ title, topK }),
    enabled: false,
    staleTime: 1000 * 60 * 10,
  });
}