import { useMutation } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "@/services/apiAuth";

export const useDeleteUser = () => {
    const { mutate: deleteUser, isPending } = useMutation({
        mutationFn: (id) => deleteUserApi(id),
    });
    return { deleteUser, isPending };
};