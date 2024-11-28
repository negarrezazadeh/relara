import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/apiAuth";

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    retry: (failureCount, error) => {
      if (error.status === 401) return 0;

      return failureCount < 3;
    },
  });

  return { user, isLoading, isAuthenticated: !!user, isAdmin: user?.role === "admin" };
};
