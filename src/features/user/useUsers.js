import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/apiAuth";

export default function useUsers(page) {
  const {
    data: users,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
    keepPreviousData: true,
  });  

  return {
    users,
    isLoading,
    isPlaceholderData,
    currentPage: users?.currentPage || 1,
    lastPage: users?.lastPage || 1,
  };
}
