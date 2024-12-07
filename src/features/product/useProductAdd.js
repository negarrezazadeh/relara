import { createOrUpdateProduct } from "@/services/apiProduct";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useProductAdd() {
  const { mutate: addProduct, isPending } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: (data) => createOrUpdateProduct({ data }),
    onSuccess: () => {
      toast.success("Product added successfully");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return { addProduct, isPending };
}
