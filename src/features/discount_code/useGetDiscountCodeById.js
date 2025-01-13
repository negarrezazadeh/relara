import { getDiscountCodeById } from "@/services/apiDiscountCode";
import { useQuery } from "@tanstack/react-query";

export default function useGetDiscountCodeById(id) {
  const { data: discountCodes, isLoading } = useQuery({
    queryKey: [`discountCode_${id}`],
    queryFn: () => getDiscountCodeById(id),
  });

  return { discountCodes, isLoading };
}
