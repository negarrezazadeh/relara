import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteAttribute as deleteAttributeApi} from "@/services/apiAttribute";

export default function useDeleteAttribute() {
 const queryClient = useQueryClient()
 const {mutate: deleteAttribute , isPending} = useMutation({
    mutationKey: ["delete-attribute"],
    mutationFn: (id) => deleteAttributeApi(id), 
    onSuccess: () => {
      toast.success("Attribute deleted successfully");
      queryClient.invalidateQueries(["attributes"]);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    },
 })

 return {deleteAttribute, isPending}
}
