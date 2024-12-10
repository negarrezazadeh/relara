import { createOrUpdateProductVariants } from '@/services/apiProduct';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useProductVariantUpdate() {
    const navigate = useNavigate()
    const { mutate: updateProductVariant, isPending } = useMutation({
      mutationFn: ({ id, data }) => createOrUpdateProductVariants({ id, data }),
      mutationKey: ["update-product-variant"],
      onSuccess: () => {
        toast.success("Product updated successfully");
        navigate("/products");
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMessage);
      },
  
    });
  
    return { updateProductVariant, isPending };
}
