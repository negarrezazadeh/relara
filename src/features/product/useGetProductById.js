import { getProductById } from "@/services/apiProduct";
import { useQuery } from "@tanstack/react-query";

export default function useGetProductById(id) {
  const { data: product, isLoading } = useQuery({
    queryKey: [`product_${id}`],
    queryFn: () => getProductById(id),
  });

  return { product, isLoading };
}
