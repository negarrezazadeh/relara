import { getAttributeValues } from "@/services/apiAttribute";
import { useQuery } from "@tanstack/react-query";

export default function useAttributeValues() {
  const { data: attributeValues, isLoading } = useQuery({
    queryKey: ["attributeValues"],
    queryFn: () => getAttributeValues(),
  });

  return { attributeValues, isLoading };
}
