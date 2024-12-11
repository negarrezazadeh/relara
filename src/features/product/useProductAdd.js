import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrUpdateProduct } from "@/services/apiProduct";
import { useNavigate } from "react-router-dom";

export default function useProductAdd() {
  const navigate = useNavigate()
  const { mutate: addProduct, isPending } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: (data) => createOrUpdateProduct({ data }),
    onSuccess: () => {
      toast.success("Product added successfully");
      navigate("/products");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return { addProduct, isPending };
}
