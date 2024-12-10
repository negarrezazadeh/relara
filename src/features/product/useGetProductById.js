import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/apiProduct";

export default function useGetProductById(id) {
  const { data: product, isLoading } = useQuery({
    queryKey: [`product_${id}`],
    queryFn: () => getProductById(id),
  });

  return { product, isLoading };
}
