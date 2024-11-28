import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/services/apiAuth";

export default function useGetUserById(id) {
  const { data: user, isLoading } = useQuery({
    queryKey: [`user_${id}`],
    queryFn: () => getUserById(id),
  });

  return { user, isLoading };
}
