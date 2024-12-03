import { useQuery } from "@tanstack/react-query";
import { getAttributes } from "@/services/apiAttribute";

export default function useAttributes() {
  const { data: attributes, isLoading } = useQuery({
    queryKey: ["attributes"],
    queryFn: () => getAttributes(),
  });
  return { attributes, isLoading };
}
