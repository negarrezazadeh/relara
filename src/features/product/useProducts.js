import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/apiProduct";

export default function useProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return { products, isLoading };
}
