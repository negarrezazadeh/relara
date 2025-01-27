import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createOrUpdateProduct } from "@/services/apiProduct";

export default function useProductUpdate() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate: updateProduct, isPending } = useMutation({
    mutationFn: ({ id, data }) => createOrUpdateProduct({ id, data }),
    mutationKey: ["update-product"],
    onSuccess: (data) => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries([`product_${data.product.id}`]);
      navigate("/products");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return { updateProduct, isPending };
}
