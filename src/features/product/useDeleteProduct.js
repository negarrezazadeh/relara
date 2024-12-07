import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "@/services/apiProduct";
import toast from "react-hot-toast";

export default function useDeleteProduct() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteProduct,
    isPending,
    isIdle,
  } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: (id) => deleteProductApi(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return { deleteProduct, isPending, isIdle };
}
