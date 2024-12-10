import { createOrUpdateProductVariants } from "@/services/apiProduct";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useProductVariantAdd() {
  const { mutate: addProductVariant, isPending } = useMutation({
    mutationKey: ["add-variant"],
    mutationFn: (data) => createOrUpdateProductVariants({ data }),
    onSuccess: () => {
      toast.success("Product variant added successfully");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return { addProductVariant, isPending };
}
