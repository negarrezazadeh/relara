import { deleteAttributeValue as deleteAttributeValueApi } from "@/services/apiAttribute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteAttributeValue() {
    const queryClient = useQueryClient();
    const { mutate: deleteAttributeValue, isPending } = useMutation({
        mutationKey: ["delete-attribute-value"],
        mutationFn: (id) => deleteAttributeValueApi(id),
        onSuccess: () => {
            toast.success("Attribute value deleted successfully");
            queryClient.invalidateQueries(["attributeValues"]);
        },
        onError: (error) => {
            const errorMessage =
                error?.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
        },
    });
    return { deleteAttributeValue, isPending };
}
