import { login as loginApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({email, password}),
    mutationKey: ["login"],
  });
  return { login, isPending };
};
