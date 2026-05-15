import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/api/services/home/fetchCategories';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 60_000,
  });
}