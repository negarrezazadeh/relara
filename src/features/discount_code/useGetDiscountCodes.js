import { getDiscountCodes } from "@/services/apiDiscountCode";
import { useQuery } from "@tanstack/react-query";

export default function useGetDiscountCodes() {
  const { data: discountCodes, isLoading } = useQuery({
    queryKey: ["discountCodes"],
    queryFn: () => getDiscountCodes(),
  });

  return { discountCodes, isLoading };
}
