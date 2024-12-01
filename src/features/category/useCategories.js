import { getCategories } from "@/services/apiCategory";
import { useQuery } from "@tanstack/react-query";

export default function useCategories() {
    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    })

    return { categories, isLoading }
}
