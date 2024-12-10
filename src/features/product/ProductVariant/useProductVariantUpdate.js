import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createOrUpdateProductVariants } from '@/services/apiProduct';

export default function useProductVariantUpdate(id) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate: updateProductVariant, isPending } = useMutation({
      mutationFn: ({ id, data }) => createOrUpdateProductVariants({ id, data }),
      mutationKey: ["update-product-variant"],
      onSuccess: () => {
        toast.success("Product updated successfully");
        queryClient.invalidateQueries(["productVariant"]);
        navigate(-1);
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMessage);
      },
    });
  
    return { updateProductVariant, isPending };
}
