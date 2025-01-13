import { createOrUpdateDiscountCode } from "@/services/apiDiscountCode";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useUpdateDiscountCode() {
  const navigate = useNavigate()
  const { mutate: updateDiscountCode, isPending } = useMutation({
    mutationFn: ({ id, data }) => createOrUpdateDiscountCode({ id, data }),
    mutationKey: ["update-discount-code"],
    onSuccess: () => {
      toast.success("Discount code updated successfully");
      navigate("/discount-codes");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return {updateDiscountCode, isPending};
}
