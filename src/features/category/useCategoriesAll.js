import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/apiCategory";

export default function useCategoriesAll() {
  const { data: allCategories, isLoading } = useQuery({
    queryKey: ["all_categories"],
    queryFn: () => getAllCategories(),
  });

  return { allCategories, isLoading };
}
