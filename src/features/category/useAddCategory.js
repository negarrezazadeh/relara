import { createOrUpdateCategory } from "@/services/apiCategory";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAddOrUpdateCategory() {
  const { mutate: addOrUpdateCategory, isLoading: isPending } = useMutation({
    mutationFn: ({ id, data }) => createOrUpdateCategory({ id, data }),
    mutationKey: ["add_or_update_category"],
    onSuccess: () => {
      toast.success("Category saved successfully");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return { addOrUpdateCategory, isPending };
}
