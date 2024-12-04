import { createOrUpdateAttribute } from "@/services/apiAttribute";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useAttributeUpdate() {
  const navigate = useNavigate()
  const { mutate: updateAttribute, isPending } = useMutation({
    mutationFn: ({ id, data }) => createOrUpdateAttribute({ id, data }),
    mutationKey: ["update-attribute"],
    onSuccess: () => {
      toast.success("Attribute updated successfully");
      navigate("/attributes");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },

  });

  return { updateAttribute, isPending };
}
