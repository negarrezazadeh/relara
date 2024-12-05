import { createOrUpdateAttributeValue } from "@/services/apiAttribute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useUpdateAttributeValue() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { mutate: updateAttributeValue, isPending } = useMutation({
    mutationFn: ({ id, data }) => createOrUpdateAttributeValue({ id, data }),
    mutationKey: ["update-attribute"],
    onSuccess: () => {
      toast.success("Attribute value updated successfully");
      queryClient.invalidateQueries(["attributes"]);
      navigate("/attributes");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },

  });

  return { updateAttributeValue, isPending };
}
