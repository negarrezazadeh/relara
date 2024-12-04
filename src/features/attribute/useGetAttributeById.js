import { getAttributeById } from "@/services/apiAttribute";
import { useQuery } from "@tanstack/react-query";

export default function useGetAttributeById(id) {
  const { data: attribute, isLoading } = useQuery({
    queryKey: [`attribute_${id}`],
    queryFn: () => getAttributeById(id),
  });

  return { attribute, isLoading };
}
