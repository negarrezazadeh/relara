import { getUsers } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export default function useUsers() {
  const { isLoading, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  return { users, isLoading };
}
