import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/apiAuth";

export default function useUsers() {
  const { isLoading, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  return { users, isLoading };
}
