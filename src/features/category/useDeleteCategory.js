import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCategory as deleteCategoryApi } from "@/services/apiCategory";

export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteCategory,
    isPending,
    isIdle,
  } = useMutation({
    mutationKey: ["delete_category"],
    mutationFn: (id) => deleteCategoryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return { deleteCategory, isPending, isIdle };
}
