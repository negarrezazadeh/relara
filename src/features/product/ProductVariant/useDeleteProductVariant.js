import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProductVariant as deleteProductVariantApi } from "@/services/apiProduct";

export default function useDeleteProductVariant() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteProductVariant,
    isPending,
    isIdle,
  } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: (id) => deleteProductVariantApi(id),
    onSuccess: () => {
      toast.success("Product variant deleted successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return { deleteProductVariant, isPending, isIdle };
}