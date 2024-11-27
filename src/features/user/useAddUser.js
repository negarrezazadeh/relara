import { useMutation } from "@tanstack/react-query";
import { createOrUpdateUser } from "@/services/apiAuth";
import toast from "react-hot-toast";

export default function useAddUser() {
  const { mutate: addUser, isPending } = useMutation({
    mutationFn: (data) => createOrUpdateUser({ data }),
    mutationKey: ["add-user"],
    onSuccess: () => {
      toast.success('User added successfully');
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });
  return { addUser, isPending };
}
