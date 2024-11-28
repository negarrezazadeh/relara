import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "@/services/apiAuth";

export const useLogin = () => {
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({email, password}),
    mutationKey: ["login"],
  });
  return { login, isPending };
};
