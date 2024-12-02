import { createOrUpdateCategory } from "@/services/apiCategory";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useUpdateCategory() {
  const { mutate: updateCategory, isLoading: isPending } = useMutation({
    mutationFn: ({ id, data }) => createOrUpdateCategory({ id, data }),
    mutationKey: ["update_category"],
    onSuccess: () => {
      toast.success("Category updated successfully");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return { updateCategory, isPending };
}
