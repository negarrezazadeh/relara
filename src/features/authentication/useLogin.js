import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "@/services/apiAuth";
import toast from "react-hot-toast";

export const useLogin = () => {
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({email, password}),
    mutationKey: ["login"],
    // onSuccess: () => {
    //   toast.success("Welcome back!");
    // },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });
  return { login, isPending };
};
