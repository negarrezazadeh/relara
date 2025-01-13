import { deleteDiscountCode as deleteDiscountCodeApi } from "@/services/apiDiscountCode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteDiscountCode() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteDiscountCode,
    isPending,
    isIdle,
  } = useMutation({
    mutationKey: ["delete-discount-code"],
    mutationFn: (id) => deleteDiscountCodeApi(id),
    onSuccess: () => {
      toast.success("Discount code deleted successfully");
      queryClient.invalidateQueries(["discount-codes"]);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return { deleteDiscountCode, isPending, isIdle };
}
