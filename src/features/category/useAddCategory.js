import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrUpdateCategory } from "@/services/apiCategory";

export default function useAddCategory() {
  const navigate = useNavigate()
  const {mutate: addCategory , isPending} = useMutation({
    mutationFn: (data) => createOrUpdateCategory({data}),
    mutationKey: ["add_category"],
    onSuccess: () => {
      toast.success('Category added successfully');
      navigate('/categories')
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  })

  return {addCategory, isPending}
}
