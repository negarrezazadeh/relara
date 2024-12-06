import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrUpdateAttributeValue } from "@/services/apiAttribute";

export default function useAddAttributeValue() {
  const queryClient = useQueryClient();
  const {
    mutate: addAttributeValue,
    isPending,
  } = useMutation({
    mutationKey: ["add-attribute-value"],
    mutationFn: (data) => createOrUpdateAttributeValue({ data }),
    onSuccess: () => {
      toast.success("Attribute value added successfully");
      queryClient.invalidateQueries(["attributeValues"]);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
  });

  return { addAttributeValue, isPending };
}
