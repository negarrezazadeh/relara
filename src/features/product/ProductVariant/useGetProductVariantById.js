import { useQuery } from "@tanstack/react-query";
import { getProductVariantById } from "@/services/apiProduct";

export default function useGetProductVariantById(id) {
  const { data: productVariant, isLoading } = useQuery({
    queryKey: ["productVariant"],
    queryFn: () => getProductVariantById(id),
  });
  return { productVariant, isLoading };
}
