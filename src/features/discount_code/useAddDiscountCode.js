import { createOrUpdateDiscountCode } from "@/services/apiDiscountCode";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAddDiscountCode(data) {
  const { mutate: addDiscountCode, isPending } = useMutation({
    mutationKey: ["add-discount-code"],
    mutationFn: (data) => createOrUpdateDiscountCode({ data }),
    onSuccess: () => {
      toast.success("Discount code added successfully");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return { addDiscountCode, isPending };
}
