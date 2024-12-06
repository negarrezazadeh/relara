import { useQuery } from "@tanstack/react-query";
import { getAttributeById } from "@/services/apiAttribute";

export default function useGetAttributeById(id) {
  const { data: attribute, isLoading } = useQuery({
    queryKey: [`attribute_${id}`],
    queryFn: () => getAttributeById(id),
  });

  return { attribute, isLoading };
}
