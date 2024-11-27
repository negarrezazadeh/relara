import { getUserById } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserById(id) {
  const { data: user, isLoading } = useQuery({
    queryKey: [`user_${id}`],
    queryFn: () => getUserById(id),
  });

  return { user, isLoading };
}
