import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "@/services/apiCategory";

export default function useGetCategoryById(id) {
  const { data: category, isLoading } = useQuery({
    queryKey: [`category_${id}`],
    queryFn: () => getCategoryById(id),
  });

  return { category, isLoading };
}
