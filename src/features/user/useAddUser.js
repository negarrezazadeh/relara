import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createOrUpdateUser } from "@/services/apiAuth";

export default function useAddUser() {
  const navigate = useNavigate()
  const { mutate: addUser, isPending } = useMutation({
    mutationFn: (data) => createOrUpdateUser({ data }),
    mutationKey: ["add-user"],
    onSuccess: () => {
      toast.success('User added successfully');
      navigate('/users')
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });
  return { addUser, isPending };
}
