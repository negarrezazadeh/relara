import { useQuery } from "@tanstack/react-query";
import { getAttributeValues } from "@/services/apiAttribute";

export default function useAttributeValues() {
  const { data: attributeValues, isLoading } = useQuery({
    queryKey: ["attributeValues"],
    queryFn: () => getAttributeValues(),
  });

  return { attributeValues, isLoading };
}
