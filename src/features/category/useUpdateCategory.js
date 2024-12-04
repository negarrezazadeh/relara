import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrUpdateCategory } from "@/services/apiCategory";

export default function useUpdateCategory() {
  const navigate = useNavigate()
  const { mutate: updateCategory, isPending } = useMutation({
    mutationFn: ({ id, data }) => createOrUpdateCategory({ id, data }),
    mutationKey: ["update_category"],
    onSuccess: () => {
      toast.success("Category updated successfully");
      navigate("/categories");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return { updateCategory, isPending };
}
