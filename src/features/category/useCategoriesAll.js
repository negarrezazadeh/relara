import { getAllCategories } from "@/services/apiCategory";
import { useQuery } from "@tanstack/react-query";

export default function useCategoriesAll() {
  const { data: allCategories, isLoading } = useQuery({
    queryKey: ["all_categories"],
    queryFn: () => getAllCategories(),
  });

  return { allCategories, isLoading };
}
